import React from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getColumnsForPlayers, setResetScoreTableColumns } from '../actions/scoreTableActions';
import { setSaveGameNeeded } from '../actions/gameActions';

class ScoreTable extends React.Component {
  state = {
    columns: []
  }
  
  gridOptions = {};

  componentDidMount() {
    this.resetColumns();
  }

  componentDidUpdate(prevProps, prevState) {
    this.resetColumns();
  }

  setValueChanged = (params) => {
    let gridRow = params.data;
    let gridCol = params.colDef;
    let newVal  = params.newValue;
    console.log('setValueChanged:', gridRow.no, gridCol.field, newVal);

    let rowIdx = gridRow.no - 1;
    let changedRow = { ...this.props.rows[rowIdx] };
    changedRow[gridCol.field] = newVal;
    let newRows = [
      ...this.props.rows.slice(0, rowIdx), 
      changedRow, 
      ...this.props.rows.slice(rowIdx + 1) ];

    this.props.setScoreTableRows(newRows);
    this.props.setSaveGameNeeded(true);
  }

  resetColumns() {
    let resetNeeded = this.props.isResetScoreTableColumnsNeeded || 
      this.state.columns.length !== this.props.players.length + 1
    if (!resetNeeded) {
      return;
    }

    this.props.setResetScoreTableColumns(false);

    let cols = getColumnsForPlayers(this.props.players, this.setValueChanged);
    this.setState({ columns: cols });
  }

  onGridReady = (params) => {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;

    this.gridOptions.api.setColumnDefs(this.state.columns);
    this.gridOptions.api.sizeColumnsToFit();
    this.setRows(this.props.rows);
  }

  addRow = () => {
    this.gridOptions.api.stopEditing(false);
    let rows = this.props.rows;
    let lastRow = rows[rows.length-1];
    rows = [...rows, {...lastRow, no: lastRow.no + 1}];
    this.setRows(rows);
  }

  delRow = () => {
    this.gridOptions.api.stopEditing(false);
    let rows = this.props.rows;
    if (rows.length <= 1) {
      return;
    }
    rows.pop();
    this.setRows(rows);
  }

  setRows = (rows) => {
    this.gridOptions.api.setRowData(rows);
    this.props.setScoreTableRows(rows);
    this.props.setSaveGameNeeded(true);
  }

  isCurrentPlayerEqualLoginPlayer = () => {
    // console.log('isCurrentPlayerEqualLoginPlayer', this.props.loginPlayer, this.props.players[this.props.nextPlayerIndex]);
    return this.props.players[this.props.nextPlayerIndex]._id === this.props.loginPlayer._id;
  }

  render() {
    this.gridOptions.api && this.gridOptions.api.sizeColumnsToFit();
    let agGridOptions = {
      getRowNodeId: function(row) {
        return row.no;
      },
    }
    let buttonsDisabledStyle = this.isCurrentPlayerEqualLoginPlayer() ? '' : 'disabled';
    return (
  
      <div className="container-fluid" 
          style={{
            marginTop: '10px',
            width: '100%',
            height: 'calc(100vh - 70px)'
          }}>
        <div className="row"
          style={{
            background: 'gray',
          }}
        >
          <div className="col align-self-center p-0">
            <a href="/#" className={`btn btn-primary btn-sm p-1 m-1 ${buttonsDisabledStyle}`}
              onClick={this.addRow}
            >
              Add row
            </a>
            <a href="/#" className={`btn btn-primary btn-sm p-1 m-1 ${buttonsDisabledStyle}`}
              onClick={this.delRow}
            >
              Del last row
            </a>
          </div>
        </div>
        <div className="row"
          style={{
            height: 'calc(100vh - 110px)'
          }}>
          <div className="col-12 ag-theme-balham p-0">
            <AgGridReact
              onGridReady={this.onGridReady}
              rowData={this.props.rows}
              columnDefs={this.state.columns}
              deltaRowDataMode={true}
              gridOptions={agGridOptions}
              >
            </AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}

const setScoreTableRows = (rows) => {
  return {
    type: 'SET_SCORETABLE_ROWS',
    rows
  }
} 

const mapStateToProps = (state) => {
  return {
    players: state.game.players,
    isScoreTableVisible: state.session.isScoreTableVisible,
    isResetScoreTableColumnsNeeded: state.session.isResetScoreTableColumnsNeeded,
    rows: state.game.scoreTable.rows,
    gameStatus: state.game.status,
    loginPlayer: state.session.player,
    nextPlayerIndex: state.game.nextPlayerIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableRows: rows => { dispatch(setScoreTableRows(rows)) },
    setSaveGameNeeded: isNeeded => { dispatch(setSaveGameNeeded(isNeeded)) },
    setResetScoreTableColumns: isNeeded => { dispatch(setResetScoreTableColumns(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTable);
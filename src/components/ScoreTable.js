import React from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getColumnsForPlayers } from '../actions/scoreTableActions';
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
    if (this.state.columns.length === this.props.players.length + 1) {
      return;
    }
    
    let cols = getColumnsForPlayers(this.props.players, this.setValueChanged);
    this.setState({ columns: cols });
  }

  onGridReady = (params) => {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;

    this.gridOptions.api.setColumnDefs(this.state.columns);
    this.gridOptions.api.setRowData(this.props.rows);
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

  render() {
    let agGridOptions = {
      getRowNodeId: function(row) {
        return row.no;
      },
    }
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
            <button className="btn btn-primary btn-sm p-1 m-1" onClick={this.addRow}>Add row</button>
            <button className="btn btn-primary btn-sm p-1 m-1" onClick={this.delRow}>Del last row</button>
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
    rows: state.game.scoreTable.rows,
    gameStatus: state.game.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableRows: rows => { dispatch(setScoreTableRows(rows)) },
    setSaveGameNeeded: isNeeded => { dispatch(setSaveGameNeeded(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTable);
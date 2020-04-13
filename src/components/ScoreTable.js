import React from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class ScoreTable extends React.Component {
  gridOptions = {};

  componentDidMount() {
    let userColumns = this.props.players.map((player, k) => {
      return ({
        valueGetter: function(params) {
          return params.data[player.id];
         },
        valueSetter: function(params) {
          let newValue = parseInt(params.newValue);
          newValue = isNaN(newValue) ? params.oldValue : newValue;
          params.data[player.id] = newValue;
          return true;
        },
        headerName: player.name,
        resizable: true, 
        editable: true
      });
    });
    let cols = this.props.columns;
    if (cols.length <= 1) {
      cols.push(...userColumns);
      this.props.setScoreTableColumns(cols);  
    }
  }
  
  onGridReady = (params) => {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;

    this.gridOptions.api.setColumnDefs(this.props.columns);
    this.gridOptions.api.sizeColumnsToFit();
  }

  addRow = () => {
    this.gridOptions.api.stopEditing(false);
    let rows = this.props.rows;
    let lastRow = rows[rows.length-1];
    rows = [...rows, {...lastRow, no: lastRow.no + 1}];
    this.props.setScoreTableRows(rows);
  }

  delRow = () => {
    this.gridOptions.api.stopEditing(false);
    let rows = this.props.rows;
    if (rows.length <= 1) {
      return;
    }
    rows.pop();
    this.gridOptions.api.setRowData(rows);
    this.props.setScoreTableRows(rows);
  }

  render() {
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
              columnDefs={this.props.columns}
              rowData={this.props.rows}
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

const setScoreTableColumns = (columns) => {
  return {
    type: 'SET_SCORETABLE_COLUMNS',
    columns
  }
} 

const mapStateToProps = (state) => {
  return {
    players: state.gameStatus.players,
    isScoreTableVisible: state.gameStatus.scoreTable.isVisible,
    rows: state.gameStatus.scoreTable.rows,
    columns: state.gameStatus.scoreTable.columns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableRows: rows => { dispatch(setScoreTableRows(rows)) },
    setScoreTableColumns: columns => { dispatch(setScoreTableColumns(columns)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTable);
import React from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class ScoreTable extends React.Component {
  gridOptions = {};

  state = {
    rows: [{ no:1, fa: 20, ow: 20, mp: 20, sk: 20, tb: 20}],
    columns: [
      { field: "no", headerName: "No.", resizable: false, editable: false, width: 120 }
    ]
  };

  componentDidMount() {
    let userColumns = this.props.users.map((user, k) => {
      return ({
        field: user.id,
        headerName: user.name,
        resizable: true, 
        editable: true
      });
    });
    let cols = this.state.columns;
    cols.push(...userColumns);
    this.setState({columns: cols, rows: this.state.rows });
  }
  
  onGridReady = (params) => {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;

    this.gridOptions.api.setColumnDefs(this.state.columns);
    this.gridOptions.api.sizeColumnsToFit();
  }

  addRow = () => {
    let rows = this.state.rows;
    let lastRow = rows[rows.length-1];
    rows = [...rows, {...lastRow, no: lastRow.no + 1}];
    this.setState({rows});
  }

  delRow = () => {
    let rows = this.state.rows;
    if (rows.length <= 1) {
      return;
    }
    rows.pop();
    this.gridOptions.api.setRowData(rows);
    this.setState({rows});
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
              columnDefs={this.state.columns}
              rowData={this.state.rows}>
            </AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(ScoreTable);
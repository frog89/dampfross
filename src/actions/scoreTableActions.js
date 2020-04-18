export const setResetScoreTableColumns = (isNeeded) => {
  return {
    type: 'SET_RESET_SCORETABLE_COLUMNS',
    isNeeded
  }
} 

export const getFirstRow = (players) => {
  let userColumns = getUserColumnsForPlayers(players);
  let firstRow = {no: 1};
  for (let i=0; i<userColumns.length; i++) {
    let userCol = userColumns[i];
    firstRow[userCol.field] = 20;
  }
  return firstRow;
}

export const getColumnsForPlayers = (players, cbSetValue) => {
  let userColumns = getUserColumnsForPlayers(players, cbSetValue);
  let cols = [{field: 'no', headerName: 'No.', resizable: false, editable: false}];
  cols.push(...userColumns);
  return cols;
}

export const getUserColumnsForPlayers = (players, cbSetValue) => {
  let userColumns = players.map((player, k) => {
    return ({
      valueGetter: function(params) {
        return params.data[player._id];
      },
      valueSetter: function(params) {
        let newValue = parseInt(params.newValue);
        newValue = isNaN(newValue) ? params.oldValue : newValue;
        params.data[player._id] = newValue;
        cbSetValue(params);
        return true;
      },
      field: player._id,
      headerName: player.name,
      resizable: true, 
      editable: true
    });
  });
  console.log('getUserColumnsForPlayers:', players, userColumns);
  return userColumns;
}

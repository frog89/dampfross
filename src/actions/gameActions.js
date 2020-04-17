import axios from 'axios';

export const setAutoReload = (isAutoReload) => {
  return {
    type: 'SET_AUTO_RELOAD',
    isAutoReload
  }
} 

export const setSaveGameNeeded = (isNeeded) => {
  return {
    type: 'SET_SAVE_GAME_NEEDED',
    isNeeded,
  }
}

export const setReloadGameNeeded = (isNeeded) => {
  return {
    type: 'SET_RELOAD_GAME_NEEDED',
    isNeeded,
  }
}

export const setGame = (game) => {
  return {
    type: 'SET_GAME',
    game: game,
  }
} 

export const saveGame = (game, successCallback, errorCallback) => {
  axios.patch(`http://localhost:5000/games/${game._id}`, game)
    .then((response) => {
      let game = response.data;
      successCallback(game);
    })
    .catch(err => errorCallback(err));
}

export const saveGameDispatched = (game) => {
  return (dispatch) => {
    saveGame(game, (newGame) => {
      dispatch({
        type: 'SAVE_GAME'
      });
    }, (err) => console.log(err))
  }
}

export const actAndSave = (actionBeforeSave) => {
  return (dispatch, getState) => {
    dispatch(actionBeforeSave);

    let state = getState();
    dispatch(saveGameDispatched(state.game));
  }
}

export const reloadGame = (gameId, successCallback, errorCallback) => {
  if (gameId === null) {
    return;
  }
  console.log('reloadGame:', gameId);
  axios.get(`http://localhost:5000/games/${gameId}`)
    .then((response) => {
      let game = response.data;
      successCallback(game);
    })
    .catch(err => errorCallback(err));
}

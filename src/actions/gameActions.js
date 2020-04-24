import axios from 'axios';

export const setAutoReload = (isAutoReload) => {
  return {
    type: 'SET_AUTO_RELOAD',
    isAutoReload
  }
} 

export const setGame = (game) => {
  return {
    type: 'SET_GAME',
    game: game,
  }
} 

export const saveGame = (game, successCallback, errorCallback) => {
  axios.patch(`/games/${game._id}`, game)
    .then((response) => {
      let game = response.data;
      successCallback(game);
    })
    .catch(err => errorCallback(err));
}

export const reloadGame = (gameId, successCallback, errorCallback) => {
  if (gameId === null) {
    return;
  }
  // console.log('reloadGame:', gameId);
  axios.get(`/games/${gameId}`)
    .then((response) => {
      let game = response.data;
      successCallback(game);
    })
    .catch(err => errorCallback(err));
}

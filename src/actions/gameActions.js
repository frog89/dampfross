import axios from 'axios';

export const saveGame = (game, successCallback, errorCallback) => {
  axios.patch(`http://localhost:5000/games/${game._id}`, game)
    .then((response) => {
      let game = response.data;
      successCallback(game);
    })
    .catch(err => errorCallback(err));
}
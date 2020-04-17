//const COMB_EMPTY = 1; // Empty
//const COMB_MOUNTAIN = 15; // Mountain
//const COMB_TOWN = 7; // Town
//const COMB_WATER = 14; // Water (Lake or sea)

import * as Constants from '../constants';

const initialState = {
  session: {
    player: null,
    isAutoReload: true,
    isGameStarting: true,
    isScoreTableVisible: true,
    isKonvaRedrawNeeded: false,
    isReloadGameNeeded: false,
    isSaveGameNeeded: false,
    startWizardPage: 1,
    attendOption: Constants.START_OPTION_NEW_GAME,
    penColors: [
      { colorValue: 'blue', colorName: 'Blue' },
      { colorValue: 'crimson', colorName: 'Red'},
      { colorValue: 'purple', colorName: 'Purple' },
      { colorValue: 'darkorange', colorName: 'Orange' },
      { colorValue: 'darkgreen', colorName: 'Green' },
      { colorValue: 'gold', colorName: 'Yellow' },
      { colorValue: 'saddlebrown', colorName: 'Brown' },
      { colorValue: 'DarkSlateGray', colorName: 'Gray' },
    ],
  },
  game: {
    _id: null,
    players: [
      { id: 'fa', name: 'Frank', penColor: 'orange' },
      { id: 'ow', name: 'Othmar', penColor: 'pink' },
      { id: 'mp', name: 'Markus', penColor: 'red' },
      { id: 'sk', name: 'Stephan', penColor: 'green' },
      { id: 'tb', name: 'Thomas', penColor: 'blue' },
    ],
    dices: {
      redA: 0,
      whiteA: 0,
      redB: 0,
      whiteB: 0  
    },
    scoreTable: {
      rows: [{ no:1, fa: 20, ow: 20, mp: 20, sk: 20, tb: 20}],
      columns: [
        { field: "no", headerName: "No.", resizable: false, editable: false, width: 120 }
      ]  
    },
    puppets: [],
    drawLines: [],
  },
  board: {
    name: "oestereich",
    width: 32,
    height: 28,
    combs: {
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 1, 1, 1, 15, 15, 1, 1, 15, 15, 15, 15, 1, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 1, 1, 15, 15, 15, 15, 1, 1, 1, 1, 1, 1, 1, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 15, 1, 15, 15, 15, 7, 15, 15, 15, 15, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 15, 15, 15, 15, 1, 15, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 15, 15, 1, 15, 15, 15, 1, 1, 1, 15, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 15, 15, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 15, 1, 7, 1, 1, 1, 15, 1, 1, 1, 1, 15, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 7, 1, 15, 1, 1, 1, 1, 1, 1, 15, 1, 15, 15, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 1, 1, 1, 1, 15, 1, 1, 15, 15, 15, 15, 15, 15, 1, 7, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 15, 1, 1, 1, 1, 15, 1, 7, 15, 1, 1, 15, 1, 15, 15, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 1, 1, 1, 1, 1, 1, 15, 15, 1, 15, 15, 15, 1, 15, 15, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 14, 15, 15, 1, 14, 15, 1, 15, 15, 1, 1, 1, 1, 15, 15, 15, 15, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 7, 1, 1, 14, 1, 15, 15, 15, 15, 15, 15, 1, 15, 15, 15, 1, 15, 1, 15, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 15, 1, 1, 7, 15, 15, 15, 1, 1, 1, 7, 15, 15, 15, 1, 1, 15, 15, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 15, 1, 15, 15, 15, 1, 1, 1, 7, 1, 15, 15, 15, 1, 15, 15, 1, 15, 15, 1, 15, 1, 1, 1, 1, 1, 15, 15, 1, 15, 15, 15, 1, 15, 1, 1, 1, 15, 15, 15, 1, 15, 1, 1, 1, 1, 7, 1, 1, 15, 15, 7, 1, 1, 1, 1, 15, 1, 15, 15, 1, 7, 1, 1, 15, 15, 1, 15, 15, 1, 1, 1, 15, 15, 15, 15, 15, 1, 15, 1, 15, 15, 15, 1, 15, 15, 1, 1, 15, 15, 15, 1, 1, 15, 15, 15, 1, 15, 15, 7, 1, 1, 15, 15, 15, 15, 15, 15, 15, 1, 15, 15, 1, 15, 1, 1, 1, 1, 1, 1, 15, 15, 7, 15, 1, 15, 1, 1, 7, 1, 1, 15, 15, 15, 15, 15, 1, 1, 1, 1, 1, 15, 15, 15, 7, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 15, 15, 15, 15, 15, 15, 15, 15, 1, 15, 15, 15, 7, 1, 15, 1, 15, 15, 15, 15, 15, 1, 1, 1, 7, 1, 1, 1, 1, 15, 1, 15, 15, 15, 15, 15, 15, 15, 1, 15, 7, 15, 15, 15, 15, 15, 15, 15, 15, 15, 7, 15, 1, 1, 1, 15, 15, 15, 1, 1, 1, 15, 15, 1, 15, 15, 15, 15, 1, 1, 15, 1, 15, 15, 15, 1, 15, 15, 1, 1, 1, 15, 1, 1, 15, 15, 15, 1, 1, 1, 1, 1, 1, 15, 1, 15, 15, 15, 15, 15, 15, 1, 1, 15, 15, 1, 1, 1, 1, 1, 14, 7, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 15, 15, 1, 1, 1, 1, 1, 15, 1, 7, 1, 15, 15, 1, 7, 1, 1, 1, 15, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 15, 15, 1, 15, 15, 15, 15, 15, 15, 15, 1, 1, 1, 15, 15, 15, 15, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 1, 15, 15, 15, 1, 15, 1, 15, 1, 15, 1, 1, 15, 15, 1, 15, 15, 15, 15, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1],
      offset: 0
    },
    borders: {
      data_test: [21, 0, 22, 0, 23, 0, 24, 0, 25, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 28, 0, 29, 0, 30, 0, 31, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 34, 0, 35, 0, 36, 0, 37, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 40, 0, 41, 0, 42, 0, 43, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 0, 46, 0, 47, 0, 48, 0, 49, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 30, 32, 32, 32, 32, 29, 0, 0, 30, 32, 32, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 26, 38, 0, 0, 0, 0, 0, 32, 32, 32, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 26, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 31, 31, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 26, 35, 32, 32, 36, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 26, 35, 0, 0, 0, 0, 24, 37, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 26, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 32, 36, 0, 0, 0, 0, 0, 26, 38, 36, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 38, 32, 32, 0, 0, 28, 0, 31, 31, 38, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 37, 31, 31, 31, 31, 31, 25, 26, 31, 31, 31, 31, 31, 31, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      offset: 20
    },
    rivers: {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 61, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 55, 0, 0, 0, 0, 0, 0, 0, 60, 62, 62, 62, 62, 62, 66, 61, 61, 70, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 59, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 62, 62, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      offset: 50
    },
    textObjects: {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      offset: 0,
      texts: ['CZECHOSLOVAKIA', 'WEST', 'GERMANY', 'H', 'U', 'N', 'G', 'A', 'R', 'Y', 'ITALY', 'YUGOSLAVIA']
    },
    townTexts: {
      inside: ['62',      '61',    '11\n-14', '63',    '15',        '65\n66', '56',      '55',   '16',               '64',    '51\n52',   '53',         '25',      '54',     '24',     '23',       '44',        '46',            '43',   '45',    '21\n22', '41\n42',    '33',          '26',       '31',          '35',        '34',         '32',           '36'],
      outside: ['ZWETTL', 'KREMS', 'WIEN',    'GREIN', 'ST.POLTEN', 'LINZ',   'BRAUNAU', 'WELS', 'WIENER\nNEUSTADT', 'WEYER', 'SALZBURG', 'BAD\nISCHL', 'HIEFLAU', 'LIEZEN', 'LEOBEN', 'HARTBERG', 'KITZBUHEL', 'BISCHOFSHOFEN', 'HALL', 'BRUCK', 'GRAZ',   'INNSBRUCK', 'MAUTERNDORF', 'FELDBACH', 'BAD GASTEIN', 'WOLFSBERG', 'KLAGENFURT', 'OBERDRASBURG', 'VILLACH']
    },
  }
}

const rootReducer = (state = initialState, action) => {
  let newDrawLines = null;
  switch(action.type) {
    case 'SET_SAVE_GAME_NEEDED':
      console.log('SET_SAVE_GAME_NEEDED', action.isNeeded);
      return {
        ...state,
        session: {
          ...state.session,
          isSaveGameNeeded: action.isNeeded,
        },
      }

    case 'SET_RELOAD_GAME_NEEDED':
      console.log('SET_RELOAD_GAME_NEEDED', action.isNeeded);
      return {
        ...state,
        session: {
          ...state.session,
          isReloadGameNeeded: action.isNeeded,
        },
      }
  
    case 'SAVE_GAME':
      console.log('SAVE_GAME');
      return state;

    case 'SET_AUTO_RELOAD':
      console.log('SET_AUTO_RELOAD', action.isAutoReload);
      return {
        ...state,
        session: {
          ...state.session,
          isAutoReload: action.isAutoReload,
        },
      }

    case 'SET_KONVA_REDRAW':
      console.log('SET_KONVA_REDRAW', action.isRedrawNeeded);
      return {
        ...state,
        session: {
          ...state.session,
          isKonvaRedrawNeeded: action.isRedrawNeeded,
        },
      }

    case 'SET_PLAYER':
      console.log('SET_PLAYER', action.player);
      return {
        ...state,
        session: {
          ...state.session,
          player: action.player,
        },
      }
      
    case 'SET_GAME':
      console.log('SET_GAME', action.game.puppets.length);
      return {
        ...state,
        game: action.game
      }

    case 'SET_GAME_STATUS':
      console.log('SET_GAME_STATUS', action.status);
      return {
        ...state,
        game: {
          ...state.game,
          status: action.status
        }
      }
  
    case 'SET_GAME_AND_BOARD':
      console.log('SET_GAME_AND_BOARD', action.game.name, action.board.name);
      return {
        ...state,
        session: {
          ...state.session,
          isGameStarting: false,          
        },
        game: action.game,
        board: action.board
      }
      
    case 'SET_START_WIZARD_PAGE':
      console.log('SET_START_WIZARD_PAGE', action.page);
      return {
        ...state,
        session: {
          ...state.session,
          startWizardPage: action.page
        }
      }

    case 'SET_ATTEND_OPTION':
      console.log('SET_ATTEND_OPTION', action.attendOption);
      return {
        ...state,
        session: {
          ...state.session,
          attendOption: action.attendOption
        }
      }

    case 'SET_PUPPET':
      console.log('SET_PUPPET', action.puppetCfg);
      let newPuppets = state.game.puppets.filter((value, index, arr) => {
        return value.playerId !== action.puppetCfg.playerId;
      });
      newPuppets.push(action.puppetCfg);
      return {
        ...state,
        game: {
          ...state.game,
          puppets: newPuppets
        }
      }

    case 'ADD_DRAWLINE':
      console.log('ADD_DRAWLINE', action.drawLineCfg);

      newDrawLines = state.game.drawLines;
      newDrawLines.push(action.drawLineCfg);
      
      return {
        ...state,
        session: {
          ...state.session,
          isKonvaRedrawNeeded: true
        },
        game: {
          ...state.game,
          drawLines: newDrawLines
        }
      }

    case 'REMOVE_DRAWLINE':
      console.log('REMOVE_DRAWLINE', action.mongoId);
      newDrawLines = state.game.drawLines.filter(
        (line, index, arr) => { return line._id !== action.mongoId });
      return {
        ...state,
        game: {
          ...state.game,
          drawLines: newDrawLines
        }
      }

    case 'SET_DICES':
      console.log('SET_DICES', action);
      return {
        ...state,
        game: {
          ...state.game,
          dices: {
            redA: action.redA,
            whiteA: action.whiteA,
            redB: action.redB,
            whiteB: action.whiteB
          }
        }
      }

    case 'SET_SCORETABLE_VISIBILITY':
      console.log('SET_SCORETABLE_VISIBILITY:', action.isVisible)
      return {
        ...state,
        session: {
          ...state.session,
          isScoreTableVisible: action.isVisible
        }
      }

    case 'SET_SCORETABLE_ROWS':
      console.log('SET_SCORETABLE_ROWS', action.rows);
      return {
        ...state,
        game: {
          ...state.game,
          scoreTable: {
            ...state.game.scoreTable,
            rows: action.rows
          }
        }
      };
      
    case 'SET_SCORETABLE_COLUMNS':
      return {
        ...state,
        game: {
          ...state.game,
          scoreTable: {
            ...state.game.scoreTable,
            columns: action.columns
          }
        }
      }
          
    default:
      return state;
  }
}

export default rootReducer;
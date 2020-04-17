export const setStartWizardPage = (page) => {
  return {
    type: 'SET_START_WIZARD_PAGE',
    page
  }
} 

export const setGameStarting = (isStarting) => {
  return {
    type: 'SET_GAME_STARTING',
    isStarting
  }
} 

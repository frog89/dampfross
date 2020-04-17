export const setKonvaRedrawNeeded = (isNeeded) => {
  return {
    type: 'SET_KONVA_REDRAW_NEEDED',
    isNeeded
  }
} 

export const setKonvaDeleteNeeded = (isNeeded) => {
  return {
    type: 'SET_KONVA_DELETE_NEEDED',
    isNeeded
  }
} 
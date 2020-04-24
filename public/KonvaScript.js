const COMB_EMPTY = 1; // Empty
const COMB_MOUNTAIN = 15; // Mountain
const COMB_TOWN = 7; // Town
const COMB_WATER = 14; // Water (Lake or sea)

const TEXTOBJ_BIG = 18;
const TEXTOBJ_MIDDLE = 19;
const TEXTOBJ_SMALL = 20;

const COMBLINE_BLACK_DASHED = 1;
const COMBLINE_BLACK_SOLID = 2;
const COMBLINE_WHITE_DASHED = 3;
const COMBLINE_WHITE_SOLID = 4;

const COMB_RADIUS = 23;
const combDiffX = COMB_RADIUS * Math.cos(30.0 * Math.PI / 180.0);
const combDiffY = COMB_RADIUS * 0.5;

// padding will increase the size of stage
// so scrolling will look smoother
const PADDING = 800;

function getBoardDimensionInPixel() {
  return {
    x: window.innerWidth + PADDING,
    y: window.innerHeight + PADDING
  };
}

function cloneDefaultStage(){
  let konvaStateDefault = {
    session: null,
    board: null,
    game: null,
    setPuppet: null,
    addDrawLine: null,
    removeDrawLine: null,
    isCurrentPlayerEqualLoginPlayer: null,
  
    stage: null,
    drawMouseOverLine: null,
    drawStartComb: null,
  }
  return {...konvaStateDefault};
}

let konvaState = cloneDefaultStage();

function getCombRadius() {
    return COMB_RADIUS;
}

function getCombTypeName(comb) {
  if (comb===COMB_MOUNTAIN) {
    return 'm';
  } else if (comb===COMB_TOWN) {
    return 't';
  } else if (comb===COMB_WATER) {
    return 'w';
  }
  return 'e';
}

function getCombName(comb, x, y) {
  let combTypeName = getCombTypeName(comb);
  return `comb-${combTypeName}-${x}-${y}`;
}

function getCombColor(comb) {
  if (comb===COMB_MOUNTAIN) {
    return '#E67300';
  } else if (comb===COMB_TOWN) {
    return 'yellow';
  } else if (comb===COMB_WATER) {
    return '#339CFF';
  }
  return 'white';
}

function getBorderLinePoints(border, x, y) {
  let linePoints = [];
  let combMiddle = getCombMiddle(x, y);
  ({ x, y} = combMiddle);
  let dx = combDiffX;
  let dy = combDiffY;
  let r = COMB_RADIUS;
  if (border === 1) {
    linePoints = [ x-dx, y-dy, x-dx, y+dy ];
  } else if (border === 2) {
    linePoints = [ x+dx, y-dy, x+dx, y+dy ];
  } else if (border === 3) {
    linePoints = [ x-dx, y-dy, x, y-r ];
  } else if (border === 4) {
    linePoints = [ x, y-r, x+dx, y-dy ];
  } else if (border === 5) {
    linePoints = [ x-dx, y+dy, x, y+r ];
  } else if (border === 6) {
    linePoints = [ x, y+r, x+dx, y+dy ];
  } else if (border === 7) {
    linePoints = [ x-dx, y+dy, x-dx, y-dy, x, y-r ];
  } else if (border === 8) {
    linePoints = [ x+dx, y+dy, x+dx, y-dy, x, y-r ];
  } else if (border === 9) {
    linePoints = [ x-dx, y-dy, x-dx, y+dy, x, y+r ];
  } else if (border === 10) {
    linePoints = [ x+dx, y-dy, x+dx, y+dy, x, y+r ];
  } else if (border === 11) {
    linePoints = [ x-dx, y+dy, x, y+r, x+dx, y+dy ];
  } else if (border === 12) {
    linePoints = [ x+dx, y-dy, x, y-r, x-dx, y-dy ];
  } else if (border === 13) {
    linePoints = [ x, y-r, x-dx, y-dy, x-dx, y+dy, x, y+r ];
  } else if (border === 14) {
    linePoints = [ x, y-r, x+dx, y-dy, x+dx, y+dy, x, y+r ];
  } else if (border === 15) {
    linePoints = [ x-dx, y+dy, x-dx, y-dy, x, y-r, x+dx, y-dy ];
  } else if (border === 16) {
    linePoints = [ x-dx, y-dy, x, y-r, x+dx, y-dy, x+dx, y+dy ];
  } else if (border === 17) {
    linePoints = [ x-dx, y-dy, x-dx, y+dy, x, y+r, x+dx, y+dy ];
  } else if (border === 18) {
    linePoints = [ x-dx, y+dy, x, y+r, x+dx, y+dy, x+dx, y-dy ];
  } else if (border === 19) {
    linePoints = [ x, y-r, x-dx, y-dy, x-dx, y+dy, x, y+r, x+dx, y+dy ];
  } else if (border === 20) {
    linePoints = [ x, y-r, x+dx, y-dy, x+dx, y+dy, x, y+r, x-dx, y+dy ];
  } else if (border === 21) {
    linePoints = [ x, y+r, x-dx, y+dy, x-dx, y-dy, x, y-r, x+dx, y-dy ];
  } else if (border === 22) {
    linePoints = [ x, y+r, x+dx, y+dy, x+dx, y-dy, x, y-r, x-dx, y-dy ];
  } else if (border === 23) {
    linePoints = [ x-dx, y-dy, x-dx, y+dy, x, y+r, x+dx, y+dy, x+dx, y-dy ];
  } else if (border === 24) {
    linePoints = [ x-dx, y+dy, x-dx, y-dy, x, y-r, x+dx, y-dy, x+dx, y+dy ];
  } else if (border === 25) {
    linePoints = [ x, y-r, x-dx, y-dy, x-dx, y+dy, x, y+r, x+dx, y+dy, x+dx, y-dy ];
  } else if (border === 26) {
    linePoints = [ x, y-r, x+dx, y-dy, x+dx, y+dy, x, y+r, x-dx, y+dy, x-dx, y-dy ];
  } else if (border === 27) {
    linePoints = [ x, y+r, x-dx, y+dy, x-dx, y-dy, x, y-r, x+dx, y-dy, x+dx, y+dy ];
  } else if (border === 28) {
    linePoints = [ x, y+r, x+dx, y+dy, x+dx, y-dy, x, y-r, x-dx, y-dy, x-dx, y+dy ];
  } else if (border === 29) {
    linePoints = [ x+dx, y-dy, x, y-r, x-dx, y-dy, x-dx, y+dy, x, y+r, x+dx, y+dy ];
  } else if (border === 30) {
    linePoints = [ x-dx, y-dy, x, y-r, x+dx, y-dy, x+dx, y+dy, x, y+r, x-dx, y+dy ];
  }
  return linePoints;
}

function addComb(layer, x, y, comb) {
  let combMiddle = getCombMiddle(x, y);

  let polygon = new Konva.RegularPolygon({
    name: getCombName(comb, x, y),
    x: combMiddle.x,
    y: combMiddle.y,
    radius: COMB_RADIUS,
    fill: getCombColor(comb),
    sides: 6,
    stroke: 'black',
    strokeWidth: 1
  });
  layer.add(polygon);
  polygon.cache();
}

function addInsideTownText(layer, x, y, townText) {
  let combMiddle = getCombMiddle(x, y);

  let text = new Konva.Text({
    x: combMiddle.x,
    y: combMiddle.y,
    text: townText,
    fontSize: 16,
    fontFamily: 'Calibri',
    fill: 'black'
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);

  layer.add(text);
}

function addOutsideTownText(layer, x, y, townText) {
  let combMiddle = getCombMiddle(x, y);

  let text = new Konva.Text({
    x: combMiddle.x,
    y: combMiddle.y,
    text: townText,
    fontSize: 14,
    fontFamily: 'Calibri',
    fill: 'black'
  });
  text.offsetX(combDiffX * 0.8);
  text.offsetY(text.height() / 2);

  layer.add(text);
}

function addBorderLine(layer, linePoints) {
  let line = new Konva.Line({
    x: 0,
    y: 0,
    points: linePoints,
    stroke: 'red',
    strokeWidth: 3
  });
  layer.add(line);
}

function addRiverLine(layer, linePoints) {
  let line = new Konva.Line({
    x: 0,
    y: 0,
    points: linePoints,
    stroke: 'blue',
    strokeWidth: 6
  });
  layer.add(line);
}

function getTextObjLetterSpacing(textObject) {
  if (textObject === TEXTOBJ_BIG) {
    return 10;
  } else if (textObject === TEXTOBJ_MIDDLE) {
      return 4;
  } else if (textObject === TEXTOBJ_SMALL) {
      return 0;
  }  
}

function getTextObjSize(textObject) {
  if (textObject === TEXTOBJ_BIG) {
    return 30;
  } else if (textObject === TEXTOBJ_MIDDLE) {
      return 30;
  } else if (textObject === TEXTOBJ_SMALL) {
      return 15;
  }  
}

function addTextObject(layer, x, y, textObject, text) {
  let combMiddle = getCombMiddle(x, y);

  let konvaText = new Konva.Text({
    x: combMiddle.x,
    y: combMiddle.y,
    text: text,
    fontSize: getTextObjSize(textObject),
    fontFamily: 'Calibri',
    fill: 'black',
    letterSpacing: getTextObjLetterSpacing(textObject)
  });
  konvaText.offsetX(konvaText.height() / 3);
  konvaText.offsetY(konvaText.height() / 2);

  layer.add(konvaText);
}

function getTargetComb(x, y, direction) {
  let kind = 'odd';
  if (y % 2 == 0)
    kind = 'even';

  let diffX = 0;
  let diffY = 0;
  if (direction === 1 || direction === 6) {
    diffY = -1;
  } else if (direction === 2 || direction === 5) {
    diffY = 0;
  } else if (direction === 3 || direction === 4) {
    diffY = 1;
  }
  if (kind === 'even') {
    if (direction === 5) {
      diffX = -1;
    } else if (direction === 4 || direction === 6) {
      diffX = 0;
    } else if (direction === 1 || direction === 2 || direction === 3) {
      diffX = 1;
    }  
  } else if (kind === 'odd') {
    if (direction === 4 || direction === 5 || direction === 6) {
      diffX = -1;
    } else if (direction === 1 || direction === 3) {
      diffX = 0;
    } else if (direction === 2) {
      diffX = 1;
    }  
  }
  return { x: x + diffX, y: y + diffY };
}

function addCombLine(layer, x, y, combLine, lineData) {
  let startCombXY = {x, y};
  // console.log('addCombLine', startCombXY);

  let startCombMiddle = getCombMiddle(startCombXY.x, startCombXY.y);
  let linePoints = [startCombMiddle.x, startCombMiddle.y];
  for (let i = 0; i < lineData.length; i++) {
    let targetCombXY = getTargetComb(startCombXY.x, startCombXY.y, lineData[i]);
    // console.log('addCombLine-loop', i, lineData[i], targetCombXY);

    let targetCombMiddle = getCombMiddle(targetCombXY.x, targetCombXY.y);
    linePoints.push(targetCombMiddle.x);
    linePoints.push(targetCombMiddle.y);

    startCombXY = {x: targetCombXY.x, y: targetCombXY.y};
  }

  let color = null;
  let dashEnabled = false;
  let opacity = 1.0;
  // console.log('combLine', combLine);
  if (combLine === COMBLINE_BLACK_DASHED) {
    color = 'black';
    dashEnabled = true;
    opacity = 0.7;
  } else if (combLine === COMBLINE_BLACK_SOLID) {
    color = 'black';
    dashEnabled = false;
    opacity = 0.7;
  } else if (combLine === COMBLINE_WHITE_DASHED) {
    color = 'white';
    dashEnabled = true;
    opacity = 0.5;
  } else if (combLine === COMBLINE_WHITE_SOLID) {
    color = 'white';
    dashEnabled = false;
    opacity = 0.5;
  }

  let line = new Konva.Line({
    x: 0,
    y: 0,
    points: linePoints,
    stroke: color,
    opacity,
    strokeWidth: 5,
    dashEnabled,  
    dash: [10, 5],
  });
  layer.add(line);
}

function addBorder(layer, x, y, border) {
  let linePoints = getBorderLinePoints(border, x, y);
  if (linePoints.length > 0) {
    addBorderLine(layer, linePoints);
  }
}

function addRiver(layer, x, y, river) {
  let linePoints = getBorderLinePoints(river, x, y);
  if (linePoints.length > 0) {
    addRiverLine(layer, linePoints);
  }
}

function getCombMiddle(x, y) {
  let diffX = 0;
  if (y % 2 == 0) {
    diffX = combDiffX;
  }
  return { x: (x+1) * 2 * combDiffX + diffX, y: (y+1) * 1.5 * COMB_RADIUS };
}

function repositionStage(scrollContainer) {
  if (konvaState.stage === null) {
    return;
  }
  var dx = scrollContainer.scrollLeft - PADDING;
  var dy = scrollContainer.scrollTop - PADDING;
  konvaState.stage.container().style.transform =
    'translate(' + dx + 'px, ' + dy + 'px)';
  konvaState.stage.x(-dx);
  konvaState.stage.y(-dy);
  konvaState.stage.batchDraw();
}

function initStage(width, height) {
  let boardDim = getBoardDimensionInPixel();
  let stage = new Konva.Stage({
    container: 'konvaContainer',
    width: boardDim.x,
    height: boardDim.y
  });
  konvaState.stage = stage;
}

function deleteElements() {
  if (konvaState.stage) {
    konvaState.stage.destroy();
    konvaState = cloneDefaultStage();
  }
}

function drawElements(session, board, game, setPuppet, 
    addDrawLine, removeDrawLine, isCurrentPlayerEqualLoginPlayer) {  
  ({ width, height, combs, borders, rivers, townTexts, textObjects, combLines } = board);
  konvaState.session = session;
  konvaState.game = game;
  konvaState.board = board;
  konvaState.setPuppet = setPuppet;
  konvaState.addDrawLine = addDrawLine;
  konvaState.removeDrawLine = removeDrawLine;
  konvaState.isCurrentPlayerEqualLoginPlayer = isCurrentPlayerEqualLoginPlayer;

  //console.log('combs', combs);
  //console.log('borders', borders);
  //console.log('rivers', rivers);
  let scrollContainer = document.getElementById('scroll-container');
  let mapLayer = null;
  let drawLayer = null;
  let puppetLayer = null;
  let dragLayer = null;
  if (konvaState.stage) {
    let layers = konvaState.stage.getLayers();
    mapLayer = layers[0];
    mapLayer.destroyChildren();
    drawLayer = layers[1];
    drawLayer.destroyChildren();
    puppetLayer = layers[2];
    puppetLayer.destroyChildren();
    dragLayer = layers[3];
    dragLayer.destroyChildren();
  } else {
    initStage(width, height);
    mapLayer = new Konva.Layer();
    drawLayer = new Konva.Layer();
    puppetLayer = new Konva.Layer();
    dragLayer = new Konva.Layer();

    konvaState.stage.add(mapLayer);
    konvaState.stage.add(drawLayer);
    konvaState.stage.add(puppetLayer);
    konvaState.stage.add(dragLayer);

    mapLayer.on('click', event => onLayerMouseClick(drawLayer, event));
    mapLayer.on('contextmenu', event => onLayerRightMouseClick(drawLayer, event));
    mapLayer.on('mousemove', event => onLayerMouseMove(drawLayer, event));

    initDragDrop(puppetLayer, dragLayer);
  }
  drawPuppets(puppetLayer, dragLayer);
  drawDrawLines(drawLayer);

  let townTextIdx = 0;
  let textIdx = 0;
  let combLineIdx = 0;
  for (let kind = 0; kind < 3; kind++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let idx = (width * y) + x;

        if (kind === 0) {
          let comb = combs.data[idx] - combs.offset;
          addComb(mapLayer, x, y, comb);
        } else if (kind === 1) {
          let river = rivers.data[idx] - rivers.offset;
          addRiver(mapLayer, x, y, river);
        } else if (kind === 2) {
          let border = borders.data[idx] - borders.offset;
          addBorder(mapLayer, x, y, border);

          let comb = combs.data[idx] - combs.offset;
          if (comb === COMB_TOWN) {
            addInsideTownText(mapLayer, x, y, townTexts.inside[townTextIdx]);
            addOutsideTownText(mapLayer, x+1, y, townTexts.outside[townTextIdx]);
            townTextIdx++;
          }

          let textObject = textObjects.data[idx] - textObjects.offset;
          if (textObject > 0) {
            addTextObject(mapLayer, x, y, textObject, textObjects.texts[textIdx]);
            textIdx++;  
          }

          let combLine = combLines.data[idx] - combLines.offset;
          if (combLine > 0) {
            addCombLine(mapLayer, x, y, combLine, combLines.lineData[combLineIdx]);
            combLineIdx++;
          }
        }  
      }
    }  
  }
  
  mapLayer.draw();
  drawLayer.draw();
  puppetLayer.draw();
  dragLayer.draw();

  scrollContainer.addEventListener('scroll', () => repositionStage(scrollContainer));
  repositionStage(scrollContainer);  
}

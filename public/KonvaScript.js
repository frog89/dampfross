const COMB_EMPTY = 1; // Empty
const COMB_MOUNTAIN = 15; // Mountain
const COMB_TOWN = 7; // Town
const COMB_WATER = 14; // Water (Lake or sea)

const TEXTOBJ_BIG = 18;
const TEXTOBJ_MIDDLE = 19;
const TEXTOBJ_SMALL = 20;

const COMB_RADIUS = 18;
const combDiffX = COMB_RADIUS * Math.cos(30.0 * Math.PI / 180.0);
const combDiffY = COMB_RADIUS * 0.5;

// padding will increase the size of stage
// so scrolling will look smoother
const PADDING = 800;

let stage = null;
let scrollContainer = null;

function getCombRadius() {
  return COMB_RADIUS;
}

function getColor(comb) {
  if (comb===COMB_MOUNTAIN) {
    return '#E67300';
  } else if (comb===COMB_TOWN) {
    return 'yellow';
  } else if (comb===COMB_WATER) {
    return 'blue';
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
    x: combMiddle.x,
    y: combMiddle.y,
    radius: COMB_RADIUS,
    fill: getColor(comb),
    sides: 6,
    stroke: 'black',
    strokeWidth: 1
  });
  layer.add(polygon);
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

function repositionStage() {
  var dx = scrollContainer.scrollLeft - PADDING;
  var dy = scrollContainer.scrollTop - PADDING;
  stage.container().style.transform =
    'translate(' + dx + 'px, ' + dy + 'px)';
  stage.x(-dx);
  stage.y(-dy);
  stage.batchDraw();
}

function initStage(width, height) {
  stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth + PADDING * 2,
    height: window.innerHeight + PADDING * 2
  });
  scrollContainer = document.getElementById('scroll-container');
}

function drawElements(board) {  
  ({ width, height, combs, borders, rivers, townTexts, textObjects } = board);
  //console.log('combs', combs);
  //console.log('borders', borders);
  //console.log('rivers', rivers);
  let layer = null;
  if (stage) {
    layer = stage.getLayers()[0];
  } else {
    initStage(width, height);
    layer = new Konva.Layer();
    stage.add(layer);
  }

  let townTextIdx = 0;
  let textIdx = 0;
  for (let kind = 0; kind < 3; kind++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let idx = (width * y) + x;

        if (kind === 0) {
          let comb = combs.data[idx] - combs.offset;
          addComb(layer, x, y, comb);
        } else if (kind === 1) {
          let river = rivers.data[idx] - rivers.offset;
          addRiver(layer, x, y, river);
        } else if (kind === 2) {
          let border = borders.data[idx] - borders.offset;
          addBorder(layer, x, y, border);

          let comb = combs.data[idx] - combs.offset;
          if (comb === COMB_TOWN) {
            addInsideTownText(layer, x, y, townTexts.inside[townTextIdx]);
            addOutsideTownText(layer, x+1, y, townTexts.outside[townTextIdx]);
            townTextIdx++;
          }

          let textObject = textObjects.data[idx] - textObjects.offset;
          if (textObject > 0) {
            addTextObject(layer, x, y, textObject, textObjects.texts[textIdx]);
            textIdx++;  
          }
        }
  
        //layer.add(createRiver(x, y, rivers[idx]));
      }
    }  
  }
  
  layer.draw();
    
  scrollContainer.addEventListener('scroll', repositionStage);
  repositionStage();  
}
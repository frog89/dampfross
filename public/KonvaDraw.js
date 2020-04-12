const NAME_START_COMB = "comb";
const NAME_START_DRAWLINE = "line-draw";
const NAME_START_MOUSEOVER_LINE = "line-mouseover";

function onLayerMouseClick(layer, event) {
  //console.log('onLayerMouseClick', event);
  
  if (event.evt.button !== 0) {
     cancelDraw(layer);
     return;
  }

  let comb = getNearestCombToMouse(layer);
  //console.log('onLayerMouseClick-comb', comb);
  if (comb) {
    if (konvaState.drawStartComb) {
      let lineShape = drawLine(layer, konvaState.drawStartComb, comb, 'orange');
      console.log('lineShape', lineShape);
      konvaState.addDrawLine({id: lineShape._id, points: lineShape.attrs.points});
    }
    konvaState.drawStartComb = comb;
  }
}

function onLayerMouseMove(layer, event) {
  //console.log('onLayerMouseOver-event', event);
  if (konvaState.drawStartComb === null) {
    return;
  }

  let comb = getNearestCombToMouse(layer);
  if (comb) {
    let isStartComb = comb.x === konvaState.drawStartComb.x && 
      comb.y === konvaState.drawStartComb.y;
    if (!isStartComb) {
      if (konvaState.drawMouseOverLine !== null) {
        konvaState.drawMouseOverLine.destroy();
      }
    
      let line = drawLine(layer, konvaState.drawStartComb, comb, null);
      konvaState.drawMouseOverLine = line;
    }
  }
}

function onLayerRightMouseClick(layer, event) {
  event.evt.preventDefault();
  //cancelDraw(layer);
}

function rectMiddle(rect) {
  return { x: rect.x + 0.5 * rect.width, y: rect.y + 0.5 * rect.height };
}

function rectContainsPoint(rect, pt) {
  return rect.x <= pt.x && pt.x <= rect.x + rect.width &&
    rect.y <= pt.y && pt.y <= rect.y + rect.height;
}

function pointMinus(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  var transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  var pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos);
}

function getNearestCombToMouse(layer) {
  let mousePos = getRelativePointerPosition(layer);
  let combOrigin00 = pointMinus(getCombMiddle(0, 0), 
    {x: combDiffX, y: combDiffY });
  let combDistance = {x: 2 * combDiffX, y: 1.5 * COMB_RADIUS };
  let hitRect = { x: 0, y: 0, width: 2 * combDiffX, height: COMB_RADIUS };

  let diff = pointMinus(mousePos, combOrigin00);
  let multiY = Math.floor(diff.y / combDistance.y);
  let multiX = 0;
  let deltaX = 0;
  if (multiY % 2 == 0) {
    multiX = Math.floor(diff.x / combDistance.x);
    deltaX = 0;
  } else {
    multiX = Math.floor((diff.x + combDiffX) / combDistance.x);
    deltaX = -combDiffX;
  }
  //console.log('getNearestCombToMouse-multi', multiX, multiY);
  if (multiX > konvaState.boardWidth || multiY > konvaState.boardHeight) {
    return null;
  }
  combRect = {x: multiX * combDistance.x + deltaX + combOrigin00.x, 
    y: multiY * combDistance.y + combOrigin00.y,
    width: hitRect.width, height: hitRect.height };
  if (rectContainsPoint(combRect, mousePos) !== true) {
    //console.log('getNearestCombToMouse-contains-point', combRect, mousePos);
    return null;
  }

  return rectMiddle(combRect);
}

function cancelDraw(layer) {
  if (konvaState.drawMouseOverLine !== null) {
    konvaState.drawMouseOverLine.destroy();
    layer.draw();
  }
  konvaState.drawMouseOverLine = null;
  konvaState.drawStartComb = null;
}

function drawLine(layer, startComb, comb, color) {
  let linePoints = [startComb.x, startComb.y, comb.x, comb.y];
  let name = color ? `${NAME_START_DRAWLINE}-${color}` : NAME_START_MOUSEOVER_LINE;
  let col = color ? color : 'gray';
  line = new Konva.Line({
    x: 0,
    y: 0,
    name: name,
    points: linePoints,
    stroke: col,
    strokeWidth: 3,
  });
  if (color) {
    line.on('click', (event) => {
      //console.log('drawLine-click', event.evt);
      let lineShape = event.target;
      if (event.evt.ctrlKey) {
        konvaState.removeDrawLine(lineShape._id);
        lineShape.destroy();
        layer.draw();
      }
    });  
  }
  layer.add(line);
  layer.draw();
  return line;
}


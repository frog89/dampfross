
function findComb(layer, event) {
  ({layerX, layerY} = event.evt);
  let smallestDistance = COMB_RADIUS;
  let combs = layer.find(node => {
    let nm = node.getName();
    if (nm && nm.startsWith("comb")) {
      let nodePos = node.position();
      let distanceToMouse = Math.hypot(layerX-nodePos.x, layerY-nodePos.y);
      if (distanceToMouse < smallestDistance) {
        smallestDistance = distanceToMouse;
        return true;
      }
      return false;
    }
  });
  if (combs.length > 0) {
    return combs[combs.length - 1];
  }
  return null;
}

function cancelDraw(layer) {
  if (konvaState.drawMouseOverLine !== null) {
    konvaState.drawMouseOverLine.destroy();
    layer.draw();
  }
  konvaState.drawMouseOverLine = null;
  konvaState.drawStartComb = null;
}

function onLayerMouseClick(layer, event) {
  if (event.evt.button !== 0) {
    cancelDraw(layer);
    return;
  }

  let comb = findComb(layer, event);
  if (comb) {
    if (konvaState.drawStartComb) {
      drawLine(layer, konvaState.drawStartComb, comb, 'orange');
    }
    konvaState.drawStartComb = comb;
  }
}

function onLayerMouseDblClick(layer, event) {
}

function onLayerRightMouseClick(layer, event) {
  event.evt.preventDefault();
  cancelDraw(layer);
}

function onLayerMouseOver(layer, event) {
  if (konvaState.drawStartComb === null) {
    return;
  }

  let comb = findComb(layer, event);
  if (comb) {
    let isSameComb = comb.attrs.x === konvaState.drawStartComb.attrs.x && 
      comb.attrs.y === konvaState.drawStartComb.attrs.y;
    if (!isSameComb) {
      if (konvaState.drawMouseOverLine !== null) {
        konvaState.drawMouseOverLine.destroy();
      }
    
      let line = drawLine(layer, konvaState.drawStartComb, comb, null);
      konvaState.drawMouseOverLine = line;
    }
  }
}

function drawLine(layer, startComb, comb, color) {
  let linePoints = [startComb.attrs.x, startComb.attrs.y, comb.attrs.x, comb.attrs.y];
  let name = color ? 'line-color' : 'line-mousemove';
  let col = color ? color : 'gray';
  line = new Konva.Line({
    x: 0,
    y: 0,
    name: name,
    points: linePoints,
    stroke: col,
    strokeWidth: 3
  });
  layer.add(line);
  layer.draw();
  return line;
}

const NAME_START_COMB = "comb";
const NAME_START_DRAWLINE = "line-draw";
const NAME_START_MOUSEOVER_LINE = "line-mouseover";

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

function findComb(layer) {
  return findShape(layer, NAME_START_COMB);
}

function findDrawLine(layer) {
  return findShape(layer, NAME_START_DRAWLINE);
}

function sqr(x) { return x * x }

function dist2(v, w) { 
  return sqr(v.x - w.x) + sqr(v.y - w.y) 
}

function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}

function distToSegment(p, v, w) { 
  return Math.sqrt(distToSegmentSquared(p, v, w)); 
}

function findShape(layer, shapeNameStart) {
  let mousePos = getRelativePointerPosition(layer);

  let smallestDistance = 1000000;
  let combs = layer.find(node => {
    let nm = node.getName();
    if (nm && nm.startsWith(shapeNameStart)) {
      //console.log('findShape', node);
      let nodePos = null;
      let distanceToMouse = 0;
      if (shapeNameStart.startsWith("line")) {
        let points = node.attrs.points;
        let v = { x: points[0], y:points[1] }
        let w = { x: points[2], y:points[3] }
        distanceToMouse = distToSegment(mousePos, v, w);
      } else {
        nodePos = node.position();
        distanceToMouse = Math.hypot(mousePos.x-nodePos.x, mousePos.y-nodePos.y);
      }
  
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
  //console.log('onLayerMouseClick', event);
  if (event.evt.ctrlKey) {
    tryDeleteDrawLine(layer);
    return;
  }
  if (event.evt.button !== 0) {
    cancelDraw(layer);
    return;
  }

  let comb = findComb(layer);
  if (comb) {
    if (konvaState.drawStartComb) {
      drawLine(layer, konvaState.drawStartComb, comb, 'orange');
    }
    konvaState.drawStartComb = comb;
  }
}

function tryDeleteDrawLine(layer) {
  console.log('tryDeleteDrawLine');
  let drawLine = findDrawLine(layer);
  if (drawLine) {
    drawLine.destroy();
    layer.draw();
  }
}

function onLayerRightMouseClick(layer, event) {
  event.evt.preventDefault();
  cancelDraw(layer);
}

function onLayerMouseOver(layer, event) {
  if (konvaState.drawStartComb === null) {
    return;
  }

  let comb = findComb(layer);
  if (comb) {
    let isStartComb = comb.attrs.x === konvaState.drawStartComb.attrs.x && 
      comb.attrs.y === konvaState.drawStartComb.attrs.y;
    if (!isStartComb) {
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
  let name = color ? `${NAME_START_DRAWLINE}-${color}` : NAME_START_MOUSEOVER_LINE;
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

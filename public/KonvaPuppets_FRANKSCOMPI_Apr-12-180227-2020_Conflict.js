const PUPPET_OFFSET = { x: COMB_RADIUS * 1.5, y: COMB_RADIUS * 1.5 }
const PUPPET_DELTA = { x: 0, y: COMB_RADIUS * 1.5 }

function resetPuppets(puppetLayer, dragLayer) {
  for (let i=0; i<puppetLayer.children().length; i++) {
    let puppet = puppetLayer.children()[i];
    puppet.x = PUPPET_OFFSET.x + i * PUPPET_DELTA.x;
    puppet.y = PUPPET_OFFSET.y + i * PUPPET_DELTA.y;
  }
}

function initPuppets(puppetLayer, dragLayer) {
  for (let i=0; i<konvaState.users.length; i++) {
    let u = konvaState.users[i];
    let x = PUPPET_OFFSET.x + i * PUPPET_DELTA.x;
    let y = PUPPET_OFFSET.y + i * PUPPET_DELTA.y;
    let puppetShape = new Konva.Circle({
      x: x,
      y: y,
      name: u.id,
      radius: COMB_RADIUS * 0.5,
      fill: u.penColor,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffset: {
        x: 3,
        y: 3
      },
      shadowOpacity: 0.6,
      startScale: 1
    });
    puppetLayer.add(puppetShape);
  }
  initDragDrop(puppetLayer, dragLayer);
}

function initDragDrop(puppetLayer, dragLayer) {
  konvaState.stage.on("dragstart", function(evt) {
    var puppet = evt.target;
    // moving to another layer will improve dragging performance
    puppet.moveTo(dragLayer);
    puppetLayer.draw();
    dragLayer.draw();

    puppet.setAttrs({
      shadowOffset: {
        x: 5,
        y: 5
      },
      scale: {
        x: puppet.getAttr("startScale") * 1.2,
        y: puppet.getAttr("startScale") * 1.2
      }
    });
  });

  konvaState.stage.on("dragend", function(evt) {
    var puppet = evt.target;
    puppet.moveTo(puppetLayer);
    storePuppets(puppetLayer);
    puppetLayer.draw();
    dragLayer.draw();
    puppet.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: puppet.getAttr("startScale"),
      scaleY: puppet.getAttr("startScale"),
      shadowOffsetX: 3,
      shadowOffsetY: 3
    });
  });
}

function storePuppets(puppetLayer) {
  let puppets = [];
  let puppetShapes = puppetLayer.getChildren();
  for (let i=0; i<puppetShapes.length; i++) {
    let puppet = puppetShapes[i];
    puppets.push({ x: puppet.attrs.x, y: puppet.attrs.y, name: puppet.attrs.name });
  }
  konvaState.setPuppetsCallback(puppets);
}



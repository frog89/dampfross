
function initPuppets(puppetLayer) {
  for (let i=0; i<konvaState.users.length; i++) {
    let u = konvaState.users[i];
    let outerCircle = new Konva.Circle({
      x: COMB_RADIUS,
      y: COMB_RADIUS * i,
      radius: COMB_RADIUS * 0.5,
      fill: u.penColor,
      stroke: 'black',
      strokeWidth: 2
    });
    let innerCircle = new Konva.Circle({
      radius: COMB_RADIUS * 0.2,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 1
    });
    let puppetGroup = new Konva.Group();
    puppetGroup.add(outerCircle);
    puppetGroup.add(innerCircle);
    puppetLayer.add(puppetGroup);
  }
}

function initDragDrop() {

  konvaState.stage.on("dragstart", function(evt) {
    var shape = evt.target;
    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();

    if (tween) {
      tween.pause();
    }
    shape.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scale: {
        x: shape.getAttr("startScale") * 1.2,
        y: shape.getAttr("startScale") * 1.2
      }
    });
  });

  stage.on("dragend", function(evt) {
    var shape = evt.target;
    shape.moveTo(layer);
    stage.draw();
    shape.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: shape.getAttr("startScale"),
      scaleY: shape.getAttr("startScale"),
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  });
}

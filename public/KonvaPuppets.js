const PUPPET_OFFSET = { x: COMB_RADIUS * 1.5, y: COMB_RADIUS * 1.5 }
const PUPPET_DELTA = { x: 0, y: COMB_RADIUS * 1.5 }

function resetPuppets(puppetLayer, dragLayer) {
  for (let i=0; i<puppetLayer.children().length; i++) {
    let puppet = puppetLayer.children()[i];
    puppet.x = PUPPET_OFFSET.x + i * PUPPET_DELTA.x;
    puppet.y = PUPPET_OFFSET.y + i * PUPPET_DELTA.y;
  }
}

function getPosForNewPuppet(prevPuppetCount) {
  let x = PUPPET_OFFSET.x + prevPuppetCount * PUPPET_DELTA.x;
  let y = PUPPET_OFFSET.y + prevPuppetCount * PUPPET_DELTA.y;
  return {x, y};
}

function drawPuppets(puppetLayer, dragLayer) {
  for (let i=0; i<konvaState.game.puppets.length; i++) {
    let puppet = konvaState.game.puppets[i];
    let player = konvaState.game.players.find(p => p._id === puppet.playerId);
    //console.log('drawPuppets-player:', puppet.playerId, player)
    let puppetShape = new Konva.Circle({
      x: puppet.x,
      y: puppet.y,
      name: player._id,
      radius: COMB_RADIUS * 0.5,
      fill: player.penColor,
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
}

function initDragDrop(puppetLayer, dragLayer) {
  konvaState.stage.on("dragstart", function(evt) {
    var puppet = evt.target;

    // console.log('drag', puppet.attrs.name, konvaState.session.player._id);
    let isCurrentPlayer = konvaState.isCurrentPlayerEqualLoginPlayer();
    if (puppet.attrs.name !== konvaState.session.player._id || 
        !isCurrentPlayer) {
      console.log('drag-return', isCurrentPlayer, puppet.attrs.name, konvaState.session.player._id);
      puppet.stopDrag();
      return;
    }
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
    let diff = 10;
    let middle = getCombMiddle(konvaState.board.width, konvaState.board.height);
    let x = Math.max(diff, puppet.attrs.x);
    x = Math.min(middle.x + COMB_RADIUS - diff, x);
    let y = Math.max(diff, puppet.attrs.y);
    y = Math.min(middle.y + COMB_RADIUS - diff, y);
    puppet.position({x, y});

    let puppetCfg = {x: puppet.attrs.x, y: puppet.attrs.y, playerId: puppet.attrs.name };
    //console.log('dragend-puppet:', puppetCfg);
    konvaState.setPuppet(puppetCfg);
  });
}

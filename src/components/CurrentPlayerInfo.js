import React from 'react';

class CurrentPlayerInfo extends React.Component {
  render() {
    return (
      <div 
          className="border border-primary rounded text-center p-1"
        >
        <div style={{background: `${this.props.player.penColor}`, color: 'black', padding: '3px' }}>
          <small>{this.props.player.name}</small>
        </div>
      </div>
    )
  }
}

export default CurrentPlayerInfo;
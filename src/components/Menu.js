import React from 'react';

class Menu extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/#"
            data-toggle="modal"
            data-target="#my-modal">Sign Up</a>
          <a className="dropdown-item" href="/#">Another action</a>
          <a className="dropdown-item" href="/#">Something else here</a>
        </div>
      </div>
    )
  }
}

export default Menu;
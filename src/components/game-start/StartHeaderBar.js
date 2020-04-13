import React from 'react';
import './StartHeaderBar.css';

class StartHeaderBar extends React.Component {
  render() {
    return (
      <div className="container-fluid bg-dark text-light">
        <div className="row pt-2 pb-2">
          <div className="col-12 align-self-center">
            <span className="border border-primary rounded-pill dampfross-border-width align-middle p-1 mr-2">
              <b className="p-3">Dampfross</b>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default StartHeaderBar;
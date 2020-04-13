import React from 'react';
import { connect } from 'react-redux';
import './StartWizard.css';

class WizardNewGame extends React.Component {
  prevButtonClicked = (event) => {
    this.props.setStartWizardPage(1);
  }

  nextButtonClicked = (event) => {
    this.props.setStartWizardPage(3);
  }

  render() {
    return (
      <div className="card text-center align-middle mt-3">
        <div className="card-header">
          <h5>New Game Settings</h5>
        </div>
        <div className="card-body">
          <div className="form-group text-left">
            <label htmlFor="player">Player Name:</label>
            <input type="text" class="form-control" id="player" placeholder="Enter name..."/>
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Name:</label>
            <input type="text" class="form-control" id="game" placeholder="Enter name..."/>
          </div>

          <div className="form-group text-left">
            <label htmlFor="board">Board:</label>
            <select className="combobox form-control" name="gameChooser" id="board">
              <option value="">Select Board</option>
              <option value="oesterreich">Österreich</option>
              <option value="antarktis">Antarktis</option>
            </select>
          </div>

          <div className="form-group text-left">
            <label htmlFor="penColor">Pen Color:</label>
            <select className="combobox form-control" name="colorChooser" id="penColor">
              <option value="">Select Color</option>
              <option value="green" style={{background: 'green', color: 'black'}}>Green</option>
              <option value="red" style={{background: 'red', color: 'black'}}>Red</option>
              <option value="violet" style={{background: 'violet', color: 'black'}}>Violet</option>
            </select>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary" onClick={this.prevButtonClicked}>Prev</button>
          <button className="btn btn-primary ml-2" onClick={this.nextButtonClicked}>Next</button>
        </div>
      </div>
    )
  }
}

const setStartWizardPage = (page) => {
  return {
    type: 'SET_START_WIZARD_PAGE',
    page
  }
} 

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStartWizardPage: (page) => { dispatch(setStartWizardPage(page)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardNewGame);

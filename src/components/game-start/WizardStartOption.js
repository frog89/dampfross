import React from 'react';
import { connect } from 'react-redux';
import './StartWizard.css';
import * as Constants from '../../constants';

class WizardStartOption extends React.Component {
  nextButtonClicked = (event) => {
    this.props.setStartWizardPage(2);
  }

  onStartNewOptionChanged = (event) => {
    this.props.setAttendOption(Constants.START_OPTION_NEW_GAME);
  }

  onAttendOptionChanged = (event) => {
    this.props.setAttendOption(Constants.START_OPTION_ATTEND_GAME);
  }

  onReturnOptionChanged = (event) => {
    this.props.setAttendOption(Constants.START_OPTION_RETURN_TO_GAME);
  }
  
  render() {
    return (
      <div className="card text-center align-middle mt-3">
        <div className="card-header">
          <h5>Attend Option</h5>
        </div>
        <div className="card-body">
        <div className="row justify-content-center">
        <div className="col-4">
          <div className="row justify-content-start">
            <div className="custom-control custom-radio">
              <input type="radio" className="custom-control-input" 
                id="startNewOption" name="gameOption" 
                checked={this.props.attendOption === Constants.START_OPTION_NEW_GAME} 
                onChange={this.onStartNewOptionChanged}/>
              <label className="custom-control-label" htmlFor="startNewOption">Start New Game...</label>
            </div>
          </div>
          <div className="row justify-content-start">
            <div className="custom-control custom-radio">
              <input type="radio" className="custom-control-input" 
                id="attendOption" name="gameOption"
                checked={this.props.attendOption === Constants.START_OPTION_ATTEND_GAME} 
                onChange={this.onAttendOptionChanged}/>
              <label className="custom-control-label" htmlFor="attendOption">Attend Game...</label>
            </div>
          </div>
          <div className="row justify-content-start">
            <div className="custom-control custom-radio">
              <input type="radio" className="custom-control-input" 
                id="attendOption" name="gameOption"
                checked={this.props.attendOption === Constants.START_OPTION_RETURN_TO_GAME} 
                onChange={this.onReturnOptionChanged}/>
              <label className="custom-control-label" htmlFor="attendOption">Return to Game...</label>
            </div>
          </div>
          </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary" onClick={this.nextButtonClicked}>Next</button>
        </div>
      </div>
      )
  }
}

const setAttendOption = (attendOption) => {
  return {
    type: 'SET_ATTEND_OPTION',
    attendOption
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
    attendOption: state.session.attendOption
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAttendOption: (attendOption) => { dispatch(setAttendOption(attendOption)) },
    setStartWizardPage: (page) => { dispatch(setStartWizardPage(page)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardStartOption);
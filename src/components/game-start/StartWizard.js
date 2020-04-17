import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import StartHeaderBar from './StartHeaderBar';
import WizardStartOption from './WizardStartOption';
import WizardNewGame from './WizardNewGame';
import WizardAttendGame from './WizardAttendGame';

import StartBackgroundPic from '../../images/start-background.jpg';
import store from '../../store';
import * as Constants from '../../constants';
import './StartWizard.css';

class StartWizard extends React.Component {
  render() {
    let wizardPage = null;
    if (this.props.startWizardPage === 1) {
      wizardPage = <WizardStartOption/>;
    } else if (this.props.startWizardPage === 2) {
      if (this.props.attendOption === Constants.START_OPTION_NEW_GAME ) {
        wizardPage = <WizardNewGame/>;
      } else {
        wizardPage = <WizardAttendGame/>;
      }
    }
    return (
      <Provider store={store}>
        <div className="container-fluid h-100" style={{ background: 'lightgrey' }}>
          <div className="row">
            <div className="col">
              <StartHeaderBar />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6 text-center" style={{background: 'yellow'}}>
              <img src={StartBackgroundPic} alt="start-bg" className="image"/>
              <div className="row h-100 justify-content-center wizard">
                <div className="col-8">
                  {wizardPage}
                </div>
              </div>
            </div>
          </div>          
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startWizardPage: state.session.startWizardPage,
    attendOption: state.session.attendOption,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setGameStarting: (value) => { dispatch(setGameStarting(value)) },
//   }
// }

export default connect(mapStateToProps)(StartWizard);
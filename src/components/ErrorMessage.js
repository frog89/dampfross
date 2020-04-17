import React from 'react';
import { connect } from 'react-redux';
import './ErrorMessage.css';

class ErrorMessage extends React.Component {
  render() {
    let msg = this.props.errorMessage.replace(/\\n/g, "<br/>").substring(0, 50);
    return (
      <p className="error_text" dangerouslySetInnerHTML={{__html: msg}}></p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.session.errorMessage,
  }
}

export default connect(mapStateToProps)(ErrorMessage);
import React from 'react';

const SignupDialog = ({id}) => {
  return(
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        {/* <form className="form-inline"> */}
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h5>Sign up for exclusive offers</h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button> 
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label for="nameInput">Your name</label>
                <input type="text" className="form-control" id="nameInput" placeholder="Enter your name"></input>
              </div>
              <div className="form-group">
                <label for="emailInput">Your email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter your email"></input>
              </div>
              <div className="form-group">
                <label for="address">Your address</label>
                <textarea className="form-control" id="address" rows="3" placeholder="Enter your address"></textarea>
              </div>
            </div>
            <div className="modal-footer justify-content-between"> 
              <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" id="emailCheck" value="option1"></input>
                <label className="form-check-label" for="emailCheck">Contact by email?</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" id="postCheck" value="option2"></input>
                <label className="form-check-label" for="postCheck">Contact by post?</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div> 
          </div>
        </form> 
      </div>
    </div>
  )
}

export default SignupDialog;
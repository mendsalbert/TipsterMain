import React, { Component } from 'react';
import Identicon from 'identicon.js';

class MyProfile extends Component {

  
  render() {
    return (
      <div className="container-fluid bg-white">
        <div className="row">
       
        <div className="container-fluid bg-dark mt-3">
        <div className="row">

        <div className="col" align='center'>
                <div className="mt-5 border-4 rounded-circle">
                { this.props.account
              ? <img
                className='border-4 rounded-circle'
                width='80'
                height='80'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt='identicon'
              />
              : <span></span>
            }
                </div>
                <h2 className="text-white"><small className="text-white">{this.props.author}</small></h2>
                <h5 className="text-white">0 Following 0 Followers</h5>
                </div>

                </div>
                </div>
        

        </div>
      </div>
    );
  }
}

export default MyProfile;
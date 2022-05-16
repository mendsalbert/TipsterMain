import React, { Component } from 'react';
import Identicon from 'identicon.js';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

class MyProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      buttonText: "Follow",
      count: 0,
      isOpen: false,
      isOpen2: false,
    }
  }

  handleClick = () => {
    console.log("Button clicked...")
    console.log(this.state.count)
    let buttonText = this.state.buttonText === "Follow" ? "Unfollow" : "Follow"
    this.setState({buttonText: buttonText})
    let count = this.state.count === 0 ? this.state.count + 1 : this.state.count - 1
    this.setState({count: count})
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  openModal2 = () => this.setState({ isOpen2: true });
  closeModal2 = () => this.setState({ isOpen2: false });
  
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
                <h2 className="text-white"><small className="text-white">{this.props.account}</small></h2>
                <h5 className="text-white">
                <Link to='#/following' onClick={this.openModal} style={{textDecoration: 'none', color: 'white'}}>
                    {this.state.count} Following
                  </Link>  
                  <Link to='#/followers'  onClick={this.openModal2} style={{textDecoration: 'none', color: 'white'}}>
                    &nbsp;&nbsp;0 Followers
                  </Link>
                </h5>
                </div>

                
                  {/* Following Modal */}
                  <Modal
            show={this.state.isOpen}
            onHide={this.closeModal}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size='lg'
            >
          <Modal.Header closeButton>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { this.props.images.map(image => {
              return(
                <div>
                  <div className='card-header'>
                  <img
                        className='border-4 rounded-circle'
                        width='50'
                        height='50'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        alt='identicon'
                      />
                  <small className="text-muted">{this.props.account}</small>

                  <button
                className="button button1 float-right"
                onClick={this.handleClick}
                >
                {this.state.buttonText}
                </button>
                  </div>

                </div>
              )
          })}
          </Modal.Body>
        </Modal>


        {/* Followers modal */}
        <Modal
            show={this.state.isOpen2}
            onHide={this.closeModal2}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size='lg'
            >
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { this.props.images.map(image => {
              return(
                <div>
                  <div className='card-header'>
                  <img
                        className='border-4 rounded-circle'
                        width='50'
                        height='50'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        alt='identicon'
                      />
                  <small className="text-muted">{this.props.account}</small>

                  <button
                className="button button1 float-right"
                onClick={this.handleClick}
                >
                {this.state.buttonText}
                </button>
                  </div>

                </div>
              )
          })}
          </Modal.Body>
        </Modal>

                </div>
                </div>
        

        </div>
      </div>
    );
  }
}

export default MyProfile;
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import { RWebShare } from 'react-web-share';

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
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                        alt='identicon'
                      />
                  <small className="text-muted">{image.author}</small>

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
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                        alt='identicon'
                      />
                  <small className="text-muted">{image.author}</small>

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


                <main role="main" className="col-lg-12 mt-5 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
            

            { this.props.images
              .find(image => image.author === this.props.account)
              .map((image, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                    <a href="/profile" >
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                        alt='identicon'
                      />
                      </a>
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="text-center" style={{justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
                          <iframe src={`https://ipfs.infura.io/ipfs/${image.hash}`} 
                       ></iframe></div>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                          {/* <CommentModal /> */}
                          <RWebShare
                          data={{
                            text: "Hi, check out this post on Tipster",
                            url: `https://ipfs.infura.io/ipfs/${image.hash}`,
                            title: "Tipster",
                          }}
                          onClick={() => console.log("shared successfully!")}
                        >
                          <FaIcons.FaShare size={18} className="pt-1 ml-2" color='#00b761' />
                        </RWebShare>
                        
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}

            </main>
        

        </div>
      </div>
    );
  }
}

export default MyProfile;
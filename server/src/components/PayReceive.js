import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Identicon from 'identicon.js';

class PayReceive extends Component {

    state = {
      isOpen: false
    };
  
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

  render() {

    const copyToClipboard = e => {
      navigator.clipboard.writeText(this.props.account.toString())
    }
    
    return (
      <>
                <button
                onClick={this.openModal}
                className="button button1">
                Receive
                </button>

          <Modal
            show={this.state.isOpen}
            onHide={this.closeModal}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size='lg'
            >
          <Modal.Header closeButton>
            <Modal.Title>
              Your Address
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form
          className='p-3 m-auto'
          >
            <p>
            { this.props.account
              ? <img
                className='border-4 mr-2 rounded-circle'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt='identicon'
              />
              : <span></span>
            }
              <small className="text-dark">{this.props.account}</small>
              </p>

          </form>
          </Modal.Body>
          <Modal.Footer>
          <div className="col-lg-12 p-3 m-auto mb-3">
                <div className="d-flex">
                  
                <button className="btn btn-success btn-block btn-lg mt-3"
                onClick={() => copyToClipboard(this.props.account)}
                >Copy Address</button>
                </div>
            </div>
          </Modal.Footer>
        </Modal>
        
      </>
    )
  }

}

export default PayReceive;
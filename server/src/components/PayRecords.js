import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class PayRecords extends Component {

    state = {
      isOpen: false
    };
  
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <>
                <button
                onClick={this.openModal}
                className="button button1">
                Records
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
              Your Records
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form
          className='p-3 m-auto'
          >
            <p>Something sent to ....</p>

          </form>
          </Modal.Body>
        </Modal>
        
      </>
    )
  }

}

export default PayRecords;
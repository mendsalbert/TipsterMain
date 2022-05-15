import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class PaySend extends Component {

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
                Send
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
              Send Something
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form
          className='p-3 m-auto'
          >
            <input
                id="Receiver"
                type="text"
                className="form-control mt-4"
                placeholder="Receiver Address"
                required />

            <input
                id="Amount"
                type="text"
                className="form-control mt-4"
                placeholder="Amount in ETH"
                required />
          </form>
          </Modal.Body>
          <Modal.Footer>
          <div className="col-lg-12 p-3 m-auto mb-3">
                <div className="d-flex">
                  
                <button type="submit" className="btn btn-success btn-block btn-lg mt-3">Send</button>
                </div>
            </div>
          </Modal.Footer>
        </Modal>
        
      </>
    )
  }

}

export default PaySend;
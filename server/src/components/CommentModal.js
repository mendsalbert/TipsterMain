import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Modal, FormControl } from 'react-bootstrap';

class CommentModal extends Component {

    state = {
      isOpen: false
    };
  
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <>
           
          <FaIcons.FaComment size={18} className="pt-1 ml-2" color='#00b761' onClick={this.openModal}>
        </FaIcons.FaComment>

          <Modal
            show={this.state.isOpen}
            onHide={this.closeModal}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size='lg'
            >
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
              commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            </p>
          </Modal.Body>
          <Modal.Footer>
          <div className="col-lg-12 p-3 m-auto mb-3">
                <div className="d-flex">
                  
                <FormControl
                    type="search"
                    placeholder="Add Comment"
                    className="me-2"
                    aria-label="Add Comment"
                    required
                />
                </div>
            </div>
          </Modal.Footer>
        </Modal>
        
      </>
    )
  }

}

export default CommentModal;
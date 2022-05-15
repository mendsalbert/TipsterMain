import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Notifications = () => {


  const [messages, setMessage] = useState([
    {head : "Notification", body: 'No Notification.', variant: 'info'},
  ])


  const Message = (props) => {

    const [show, setShow] = useState(true);

    const close = () => {
      setShow(false)
      setMessage(messages.filter((item, index) => index !== props.id))
    }

    if(show) {
      return (
        <Alert variant={props.variant ? props.variant : 'dark'} onClose={close} dismissible>
          <Alert.Heading>{props.head}</Alert.Heading>
          <p>
            {props.body}
          </p>
        </Alert>
      )
    } else {
      return(<></>)
    }

    
  }

    return (
      <div className="container-fluid bg-white mt-5">
      <div className="row">
      <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '900px' }}>
      <div className="content mr-auto ml-auto">

              <div className="col-lg-12 mb-4 mt-5" >
              <div className="card-header">
              <div className="message-list" >
                {
                  messages.map((item,i) => (
                    <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
                  ))
                }
            </div>
              </div>
              </div>
      </div>
      </main>
      </div>
</div>
    );
  }

export default Notifications;
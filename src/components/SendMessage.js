import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { FormControl, Button } from "react-bootstrap";
import * as IoIcons from 'react-icons/io';

function SendMessage({endOfMessagesRef}) {
  const { user, Moralis } = useMoralis();
  const [message,setMessage]=useState("");
  const sendMessage=(e)=>{
      e.preventDefault();
      if(!message)return;
      const Messages=Moralis.Object.extend("Messages");
      const messages=new Messages();
      messages
      .save({
          message:message,
          username:user.getUsername(),
          ethAddress:user.get('ethAddress'),
      })
      .then((message)=>{

      },
      (error)=>{
          console.log(error.message);
      })
      endOfMessagesRef.current.scrollIntoView({ behavior:"smooth"});
setMessage("");
  }
  return (
    <div className="row">
    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
    <div className="content mr-auto ml-auto">
    <div className="col-lg-12 p-3 m-auto mb-3">
        <div className="d-flex fixed-bottom m-3">
        <FormControl
            className="me-2"
            type="text"
            as="textarea" rows={1}
             value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder={`Enter a Message ${user.getUsername()}`}
        />
        <Button
            variant="outline-success"
            type="submit" onClick={sendMessage}
        >
            <IoIcons.IoMdSend size={23} />
        </Button>
        </div>
    </div>

    </div>
    </main>
    </div>
    // <form className="" align='center'>
    //   <input
    //     className=" flex-grow outline-none m-auto bg-transparent form-control text-gray-100"
    //     style={{width:'700px'}}
    //     type="text"
    //     value={message}
    //     onChange={(e)=>setMessage(e.target.value)}
    //     placeholder={`Enter a Message ${user.getUsername()}`}
    //   />
    //   <button type="submit" onClick={sendMessage} className="m-auto bg-success text-white border-2 border-success">Send</button>
    // </form>
  );
}

export default SendMessage;
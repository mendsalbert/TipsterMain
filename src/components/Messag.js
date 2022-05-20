import React from 'react';
import { useMoralis } from "react-moralis";
import Avatar from "./Avatar";

function Messag({ messag }) {
  const { user } = useMoralis();
  const isUserMessage = messag.get("ethAddress") === user.get("ethAddress");
  return (
    <div
      className={`flex items-end relative ml-2 mr-2 ${
        isUserMessage && "justify-end"
      }`}
    >
        <div
        className={`p-3 ml-5 mr-5 text-white shadow rounded-lg ${
          isUserMessage
            ? "bg-success"
            : "bg-dark"
        }`}
        align={` ${ isUserMessage ? "right" : "left" }`}
        // style={{width:'fit-content'}}
      >
        <p>{messag.get("message")}</p>
      </div>

      <div className={`relative h-2 w-2 ${isUserMessage && "order-last"}`} 
       align={` ${ isUserMessage ? "right" : "left" }`}>
        <Avatar username={messag.get("username")} />
      </div>
      <p
        className={`m-auto ${
          isUserMessage ? "text-success" : "text-dark"
        }`}
        align={` ${ isUserMessage ? "right" : "left" }`}
      >
        {messag.get("username")}
      </p>
      
      
    </div>
  );
}

export default Messag;
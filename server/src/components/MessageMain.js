import React from 'react';
import Login from './Login';
import { useMoralis } from 'react-moralis';
import MessageList from './MessageList';

const MessageMain = () => {
  const { isAuthenticated, logout}=useMoralis();

    if(!isAuthenticated){
      return <Login/>
    }

    return (
      <div className="overflow-hidden">
         <div className='m-auto'>

         <MessageList />

      </div>
      </div>
    );
}

export default MessageMain;
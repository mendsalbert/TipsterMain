import React from 'react';
import Login from './Login';
import { useMoralis } from 'react-moralis';
import Header from './Header';
import Message from './Message';

const MessageMain = () => {
  const { isAuthenticated, logout}=useMoralis();

    if(!isAuthenticated){
      return <Login/>
    }

    return (
      <div>
            <Header />
            <Message />

        </div>
    );
}

export default MessageMain;
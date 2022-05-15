import React from "react";
import { useMoralis } from 'react-moralis';

function Login() {
    const { authenticate}=useMoralis();
    return (
        <div className="bg-white p-5">
       
            <div className="mt-3">
        
               <button onClick={authenticate} className="bg-sky-200 items-center flex rounded-lg p-4 text-black animate-pulse ">
                   LOGIN TO CHAT  
               <img
                   src="/metaicon.png"
                  className="item-center"
                  width='35'
                  height='35'
               /></button>
            </div>
        </div>
    )
}

export default Login
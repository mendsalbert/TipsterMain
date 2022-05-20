import React from "react";
import { useMoralis } from "react-moralis";

function Login() {
  const { authenticate } = useMoralis();
  return (
    <div className="bg-white flex flex-col w-full h-full justify-center items-center p-5">
      <div className="mt-3">
        <button
          onClick={authenticate}
          className="bg-sky-200 items-center space-x-4 flex rounded-full px-8 py-2 text-black animate-pulse "
        >
          LOGIN TO CHAT
          <img
            src="/metaicon.png"
            className="ml-4 item-center"
            width="35"
            height="35"
          />
        </button>
      </div>
    </div>
  );
}

export default Login;

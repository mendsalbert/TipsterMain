import React, { Component } from "react";
import Identicon from "identicon.js";
import Menu from "./Menu";
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { ellipseAddress } from "../lib/helpers";
// import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className="bg-white shadow-lg w-full  flex flex-row items-center justify-between px-24">
        <div>
          <img src="/photo.png" className="w-20" />
        </div>
        <div className="flex flex-row items-center justify-center text-gray-600 space-x-20 py-2">
          <a href="/">
            <HomeIcon className="h-8 text-green-500" />
          </a>
          <a href="/myprofile">
            <UserIcon className="h-8 text-green-500" />
          </a>
          <a href="/messagemain">
            <ChatIcon className="h-8 text-green-500" />
          </a>
          <a href="/explore">
            <SearchIcon className="h-8 text-green-500" />
          </a>
        </div>
        <div className="flex flex-row items-center  space-x-6">
          {this.props.account ? (
            <img
              className="ml-2 rounded-full"
              width="40"
              height="40"
              src={`data:image/png;base64,${new Identicon(
                this.props.account,
                30
              ).toString()}`}
              alt="identicon"
            />
          ) : (
            <span></span>
          )}

          <p id="account" className="text-xl text-gray-600 font-bold">
            {ellipseAddress(this.props.account)}
            {/* {this.props.account} */}
          </p>
        </div>

        {/* <div className="flex flex-row items-center justify-center space-x-6 py-2">
          <button className="bg-gradient-to-r active:outline-none active:border-none from-green-600 via-green-700  to-green-900 text-center w-max   px-8 py-2  rounded-full cursor-pointer text-white">
            Connect
          </button>
        </div> */}
      </nav>
      // <nav className="navbar navbar-dark fixed-top bg-white flex-md-nowrap p-0 shadow">
      //   <Menu />
      //   <ul className="navbar-nav px-3">
      //     <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
      //       {this.props.account ? (
      //         <img
      //           className="ml-2"
      //           width="30"
      //           height="30"
      //           src={`data:image/png;base64,${new Identicon(
      //             this.props.account,
      //             30
      //           ).toString()}`}
      //           alt="identicon"
      //         />
      //       ) : (
      //         <span></span>
      //       )}
      //       <small className="text-secondary">
      //         <small id="account">{this.props.account}</small>
      //       </small>
      //       <p className="text-red-500 text-lg">
      //         React and Tailwind CSS in action.....
      //       </p>
      //     </li>
      //   </ul>
      // </nav>
    );
  }
}

export default Navbar;

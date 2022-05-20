import React, { Component } from "react";
import Identicon from "identicon.js";
import * as FaIcons from "react-icons/fa";
import { RWebShare } from "react-web-share";
import { ellipseAddress } from "../lib/helpers";

import { Link } from "react-router-dom";
import {
  CashIcon,
  PhotographIcon,
  StatusOnlineIcon,
} from "@heroicons/react/outline";
class MyProfile extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     buttonText: "Follow",
  //     count: 0,
  //     isOpen: false,
  //     isOpen2: false,
  //   }
  // }

  // handleClick = () => {
  //   console.log("Button clicked...")
  //   console.log(this.state.count)
  //   let buttonText = this.state.buttonText === "Follow" ? "Unfollow" : "Follow"
  //   this.setState({buttonText: buttonText})
  //   let count = this.state.count === 0 ? this.state.count + 1 : this.state.count - 1
  //   this.setState({count: count})
  // }

  render() {
    return (
      <div className="container-fluid bg-white w-6/12">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mt-5 ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <div className="bg-white shadow-md rounded-md mb-4  py-4">
              <div className="row">
                <div className="col" align="center">
                  {/* <div className="mt-5 border-4 rounded-circle"> */}
                  {this.props.account ? (
                    <img
                      className="border-4 rounded-circle"
                      width="80"
                      height="80"
                      src={`data:image/png;base64,${new Identicon(
                        this.props.account,
                        30
                      ).toString()}`}
                      alt="identicon"
                    />
                  ) : (
                    <span></span>
                  )}
                  {/* </div> */}
                  <div>
                    <StatusOnlineIcon className="h-8 mt-2 text-green-600" />
                    <p className="text-green-600">Online</p>
                  </div>
                  <h2 className="text-white">
                    <p className="text-gray-700 text-xl font-bold">
                      {this.props.account}
                    </p>
                  </h2>
                </div>
              </div>
            </div>

            {this.props.images
              .filter((image) => image.author === this.props.account)
              .map((image, key) => {
                return (
                  <div className="bg-white rounded-md shadow-md my-4 w-full ">
                    <Link
                      to="/profile"
                      state={{
                        id: image.id.toString(),
                        author: image.author,
                      }}
                    >
                      <div className=" p-4 flex flex-row items-center space-x-2">
                        <img
                          className="rounded-full"
                          width="40"
                          height="40"
                          src={`data:image/png;base64,${new Identicon(
                            image.author,
                            30
                          ).toString()}`}
                          alt="identicon"
                        />
                        <p>{ellipseAddress(image.author)}</p>
                      </div>
                    </Link>
                    <div>
                      <div class="w-full h-full">
                        <img
                          src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                          className="object-cover h-96 w-full"
                        />
                      </div>
                    </div>
                    <div className="p-4 flex flex-row justify-between items-center">
                      <div>
                        <p className="text-xl text-gray-500 ">
                          {image.description}
                        </p>
                        <span className="flex flex-row">
                          <CashIcon className="h-7" /> :{" "}
                          {window.web3.utils.fromWei(
                            image.tipAmount.toString(),
                            "Ether"
                          )}{" "}
                          ETH
                        </span>
                      </div>

                      <div className="p-4">
                        <button
                          className=" bg-gradient-to-r active:outline-none active:border-none border-2 px-4 py-2 border-green-500 text-center w-max rounded-full cursor-pointer text-green-500"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei(
                              "0.1",
                              "Ether"
                            );
                            console.log(event.target.name, tipAmount);
                            this.props.tipImageOwner(
                              event.target.name,
                              tipAmount
                            );
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </div>
                    </div>
                  </div>
                  // <div className="card mb-4" key={key}>
                  //   <div className="card-header">
                  //     <a href="/profile">
                  //       <img
                  //         className="mr-2"
                  //         width="30"
                  //         height="30"
                  //         src={`data:image/png;base64,${new Identicon(
                  //           image.author,
                  //           30
                  //         ).toString()}`}
                  //         alt="identicon"
                  //       />
                  //     </a>
                  //     <small className="text-muted">{image.author}</small>
                  //   </div>
                  //   <ul id="imageList" className="list-group list-group-flush">
                  //     <li className="list-group-item">
                  //       <div
                  //         className="text-center"
                  //         style={{
                  //           justifyContent: "center",
                  //           alignItems: "center",
                  //           margin: "0 auto",
                  //         }}
                  //       >
                  //         <iframe
                  //           src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                  //         ></iframe>
                  //       </div>
                  //       <p>{image.description}</p>
                  //     </li>
                  //     <li key={key} className="list-group-item py-2">
                  //       <small className="float-left mt-1 text-muted">
                  //         TIPS:{" "}
                  //         {window.web3.utils.fromWei(
                  //           image.tipAmount.toString(),
                  //           "Ether"
                  //         )}{" "}
                  //         ETH
                  //       </small>
                  //       {/* <CommentModal /> */}
                  //       <RWebShare
                  //         data={{
                  //           text: "Hi, check out this post on Tipster",
                  //           url: `https://ipfs.infura.io/ipfs/${image.hash}`,
                  //           title: "Tipster",
                  //         }}
                  //         onClick={() => console.log("shared successfully!")}
                  //       >
                  //         <FaIcons.FaShare
                  //           size={18}
                  //           className="pt-1 ml-2"
                  //           color="#00b761"
                  //         />
                  //       </RWebShare>

                  //       <button
                  //         className="btn btn-link btn-sm float-right pt-0"
                  //         name={image.id}
                  //         onClick={(event) => {
                  //           let tipAmount = window.web3.utils.toWei(
                  //             "0.1",
                  //             "Ether"
                  //           );
                  //           console.log(event.target.name, tipAmount);
                  //           this.props.tipImageOwner(
                  //             event.target.name,
                  //             tipAmount
                  //           );
                  //         }}
                  //       >
                  //         TIP 0.1 ETH
                  //       </button>
                  //     </li>
                  //   </ul>
                  // </div>
                );
              })}
          </main>
        </div>
      </div>
    );
  }
}

export default MyProfile;

import React, { Component } from "react";
import Identicon from "identicon.js";
import * as FaIcons from "react-icons/fa";
import { Button } from "react-bootstrap";
import * as IoIcons from "react-icons/io";
import { RWebShare } from "react-web-share";

import { Link } from "react-router-dom";
import { CashIcon, PhotographIcon } from "@heroicons/react/outline";
import { ellipseAddress } from "../lib/helpers";

class Main extends Component {
  // state = {
  //   isOpen: false,
  // };

  // openModal = () => this.setState({ isOpen: true });
  // closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="bg-gray-100 h-full">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <div className="content mr-auto ml-auto">
              <div>
                <div className="bg-white rounded-t mt-4  mb-4 shadow-md">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const description = this.imageDescription.value;
                      this.props.uploadImage(description);
                    }}
                  >
                    <textarea
                      className="bg-white outline-none focus:visible w-full rounded-md p-4"
                      placeholder="What is happening..."
                      rows={4}
                      ref={(input) => {
                        this.imageDescription = input;
                      }}
                    ></textarea>
                    <div className="flex flex-row  border-t-2 space-x-2 p-4 h-20 ">
                      <PhotographIcon
                        onClick={() => {
                          this.upload.click();
                        }}
                        className="h-6 text-gray-500"
                      />
                      <input
                        ref={(ref) => (this.upload = ref)}
                        style={{ display: "none" }}
                        type="file"
                        accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4, .mkv .ogg .wmv"
                        onChange={this.props.captureFile}
                      />
                      <p className="mb-4">Photo</p>
                      <button
                        type="submit"
                        className="bg-gradient-to-r active:outline-none active:border-none border-2 px-3 border-green-500 text-center w-max rounded-full cursor-pointer text-green-500"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className=" rounded-md my-2">
                <p>&nbsp;</p>
                <h2 className="text-white">Share Post</h2>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const description = this.imageDescription.value;
                    this.props.uploadImage(description);
                  }}
                >
                  <FaIcons.FaUpload
                    size={50}
                    className="shadow p-3 mb-3 mr-3"
                    color="#fff"
                    onClick={() => {
                      this.upload.click();
                    }}
                  />

                  <input
                    ref={(ref) => (this.upload = ref)}
                    style={{ display: "none" }}
                    type="file"
                    accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4, .mkv .ogg .wmv"
                    onChange={this.props.captureFile}
                  />
                  <div className="form-group mr-sm-2">
                    <br></br>
                    <input
                      id="imageDescription"
                      type="text"
                      ref={(input) => {
                        this.imageDescription = input;
                      }}
                      className="form-control"
                      placeholder="What is happening?"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn  btn-success btn-block btn-lg"
                  >
                    Post
                  </button>
                </form>
                <p>&nbsp;</p>
              </div> */}
              {this.props.images
                .sort((a, b) => a.tipAmount - b.tipAmount)
                .map((image) => {
                  console.log(image.author);
                  console.log(image.id.toString());
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
                    // <div className="card mb-4" key={image.id}>
                    //   <div className="card-header">
                    //     <Link
                    //       to="/profile"
                    //       state={{
                    //         id: image.id.toString(),
                    //         author: image.author,
                    //       }}
                    //     >
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
                    //     </Link>
                    //     <small className="text-muted">{image.author}</small>
                    //   </div>
                    //   <ul
                    //     id="imageList"
                    //     className="list-group list-group-flush"
                    //   >
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
                    //           align="middle"
                    //           src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                    //         ></iframe>
                    //       </div>
                    //       <p>{image.description}</p>
                    //     </li>
                    //     <li key={image.id} className="list-group-item py-2">
                    //       <small className="float-left mt-1 text-muted">
                    //         TIPS:{" "}
                    //         {window.web3.utils.fromWei(
                    //           image.tipAmount.toString(),
                    //           "Ether"
                    //         )}{" "}
                    //         ETH
                    //       </small>
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
            </div>
            {/* <div className="d-flex float-right fixed-bottom m-3">
              <Button
                variant="outline-success"
                type="submit"
                onClick={() => window.location.reload(false)}
              >
                <IoIcons.IoMdRefresh size={23} />
              </Button>
            </div> */}
          </main>
        </div>
      </div>
    );
  }
}

export default Main;

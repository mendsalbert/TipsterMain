import React, { Component } from "react";

import { Button } from "react-bootstrap";
import * as IoIcons from "react-icons/io";
import Identicon from "identicon.js";
import * as FaIcons from "react-icons/fa";
import { RWebShare } from "react-web-share";

class ProfileBody extends Component {
  render() {
    // console.log(this.props.images);
    return (
      <div className="container-fluid bg-white mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mt-5 ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            {this.props.images.map((image, key) => {
              return (
                <div className="card mb-4" key={key}>
                  <div className="card-header">
                    <a href="/profile">
                      <img
                        className="mr-2"
                        width="30"
                        height="30"
                        src={`data:image/png;base64,${new Identicon(
                          image.author,
                          30
                        ).toString()}`}
                        alt="identicon"
                      />
                    </a>
                    <small className="text-muted">{image.author}</small>
                    <Button
                      className="float-right"
                      variant="outline-success"
                      type="submit"
                    >
                      <IoIcons.IoMdSend size={20} />
                    </Button>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div
                        className="text-center"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0 auto",
                        }}
                      >
                        <iframe
                          src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                        ></iframe>
                      </div>
                      <p>{image.description}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        TIPS:{" "}
                        {window.web3.utils.fromWei(
                          image.tipAmount.toString(),
                          "Ether"
                        )}{" "}
                        ETH
                      </small>
                      {/* <CommentModal /> */}
                      <RWebShare
                        data={{
                          text: "Hi, check out this post on Tipster",
                          url: `https://ipfs.infura.io/ipfs/${image.hash}`,
                          title: "Tipster",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <FaIcons.FaShare
                          size={18}
                          className="pt-1 ml-2"
                          color="#00b761"
                        />
                      </RWebShare>

                      <button
                        className="btn btn-link btn-sm float-right pt-0"
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
                    </li>
                  </ul>
                </div>
              );
            })}
          </main>
        </div>
      </div>
    );
  }
}

export default ProfileBody;

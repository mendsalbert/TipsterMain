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
class ProfileBody extends Component {
  render() {
    console.log(this.props.images);

    return (
      <div className="bg-gray-100 mt-3 h-full">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <div className="content mr-auto ml-auto">
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

export default ProfileBody;

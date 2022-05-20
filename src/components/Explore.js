import React, { Component } from "react";
import { Button, FormControl } from "react-bootstrap";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import Identicon from "identicon.js";
import { RWebShare } from "react-web-share";

import { Link } from "react-router-dom";
import { CashIcon, PhotographIcon } from "@heroicons/react/outline";
import { ellipseAddress } from "../lib/helpers";
class Explore extends Component {
  state = {
    searchValue: "",
  };

  setSearchValue = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    // const [searchValue, setSearchValue] = useState("")
    return (
      <div className="container-fluid bg-white ">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <div className="content mr-auto ml-auto">
              <div className="col-lg-12 p-3 m-auto mb-3">
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Search Tipster"
                    className="w-full px-6 py-2 text-lg rounded-full ring-2 ring-green-600 outline-none focus:outline-none"
                    value={this.state.searchValue}
                    onChange={this.setSearchValue}
                    aria-label="Search"
                    required
                  />
                </div>
              </div>

              {this.props.images
                .filter((image) =>
                  image.description.match(
                    new RegExp(this.state.searchValue, "i")
                  )
                )
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
                  );
                })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Explore;

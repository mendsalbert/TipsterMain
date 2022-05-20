import React, { Component } from "react";
import Identicon from "identicon.js";
import { StatusOnlineIcon } from "@heroicons/react/outline";

class ProfileHeader extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     buttonText: "Follow",
  //     count: 0,
  //     isOpen: false,
  //     isOpen2: false,
  //   };
  //   // this.handleClick = this.handleClick.bind(this)
  // }

  // handleClick = () => {
  //   console.log("Button clicked...");
  //   console.log(this.state.count);
  //   let buttonText = this.state.buttonText === "Follow" ? "Unfollow" : "Follow";
  //   this.setState({ buttonText: buttonText });
  //   let count =
  //     this.state.count === 0 ? this.state.count + 1 : this.state.count - 1;
  //   this.setState({ count: count });
  // };

  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          {this.props.images
            .filter(
              (v, i, a) => a.findIndex((v2) => v2.author === v.author) === i
            )
            .map((image) => {
              return (
                <div>
                  {/* <div className="col" align="center">
                    <div className="border-4 rounded-circle">
                      <img
                        className="border-4 rounded-circle"
                        width="80"
                        height="80"
                        src={`data:image/png;base64,${new Identicon(
                          image.author,
                          30
                        ).toString()}`}
                        alt="identicon"
                      />
                    </div>
                    <h2 className="text-white">
                      <small className="text-white">{image.author}</small>
                    </h2>
                  </div> */}
                  <div className="bg-white rounded-md mb-4  py-4 shadow-md">
                    <div className="row">
                      <div className="col" align="center">
                        {/* <div className="mt-5 border-4 rounded-circle"> */}
                        {this.props.account ? (
                          <img
                            className="border-4 mb-4 rounded-circle"
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

                        <h2 className="text-white">
                          <p className="text-gray-700 text-xl font-bold">
                            {this.props.account}
                          </p>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

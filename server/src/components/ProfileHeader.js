import React, { Component } from "react";
import Identicon from "identicon.js";

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
      <div className="container-fluid bg-dark mt-3">
        <div className="row">
          {this.props.images
            .filter(
              (v, i, a) => a.findIndex((v2) => v2.author === v.author) === i
            )
            .map((image) => {
              return (
                <div>
                  <div className="col" align="center">
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

import Tipster from "../abis/Tipster.json";
import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Notify from "bnc-notify";
import "./App.css";

import Home from "./Home";
import Profile from "./Profile";
import MyProfile from "./MyProfile";
import Explore from "./Explore";
import MessageMain from "./MessageMain";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

const options = {
  dappId: "07dd3134-f6e3-4fa1-8300-c06eb7fc0e72",
  networkId: 3,
  darkMode: true,
};

// initialize notify
const notify = Notify(options);

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Tipster.networks[networkId];
    if (networkData) {
      const tipster = new web3.eth.Contract(Tipster.abi, networkData.address);
      this.setState({ tipster });
      const imagesCount = await tipster.methods.imageCount().call();
      this.setState({ imagesCount });
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await tipster.methods.images(i).call();
        this.setState({
          images: [...this.state.images, image],
        });
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
      });
      this.setState({ loading: false });
    } else {
      window.alert("Tipster contract not deployed to detected network.");
    }
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadImage = (description) => {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });
      this.state.tipster.methods
        .uploadImage(result[0].hash, description)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
          // pass the hash to notify.hash function for transaction updates and notifications
          const { emitter } = notify.hash(hash);

          // use emitter to listen to transaction events
          emitter.on("txSent", console.log);
          emitter.on("txPool", console.log);
          emitter.on("txConfirmed", console.log);
          emitter.on("txSpeedUp", console.log);
          emitter.on("txCancel", console.log);
          emitter.on("txFailed", console.log);
          emitter.on("all", console.log);
        });
    });
  };

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true });
    this.state.tipster.methods
      .tipImageOwner(id)
      .send({ from: this.state.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
        // pass the hash to notify.hash function for transaction updates and notifications
        const { emitter } = notify.hash(hash);

        // use emitter to listen to transaction events
        emitter.on("txSent", console.log);
        emitter.on("txPool", console.log);
        emitter.on("txConfirmed", console.log);
        emitter.on("txSpeedUp", console.log);
        emitter.on("txCancel", console.log);
        emitter.on("txFailed", console.log);
        emitter.on("all", console.log);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      tipster: null,
      images: [],
      loading: true,
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.tipImageOwner = this.tipImageOwner.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <div className="bg-gray-100 w-full h-full">
        <Router>
          <Navbar account={this.state.account} />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/profile"
              element={<Profile images={this.state.images} />}
            />
            <Route
              path="/myprofile"
              element={
                <MyProfile
                  images={this.state.images}
                  account={this.state.account}
                />
              }
            />
            <Route
              path="/explore"
              element={<Explore images={this.state.images} />}
            />
            <Route path="/messagemain" element={<MessageMain />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;

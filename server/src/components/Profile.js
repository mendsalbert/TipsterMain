// import withRouter from "react-router-dom";
import Tipster from "../abis/Tipster.json";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

import Web3 from "web3";
import Notify from "bnc-notify";
import ProfileBody from "./ProfileBody";

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

// let { state } = useParams();
// console.log(state);

const Profile = (props) => {
  const [account, setaccounts] = useState("");
  const [tipster, settipster] = useState(null);
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(false);
  const [imageCount, setimagescount] = useState("");
  const [buffer, setbuffer] = useState("");

  let location = useLocation();
  console.log(location.state.id);

  let usersPosts = images.filter(
    (imgs) => imgs.author === location.state.author
  );
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
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
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load accounts
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    setaccounts(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Tipster.networks[networkId];
    if (networkData) {
      const tipster = new web3.eth.Contract(Tipster.abi, networkData.address);
      // this.setState({ tipster });
      settipster(tipster);
      const imagesCount = await tipster.methods.imageCount().call();
      // console.log("image count", imagesCount.toString());
      // this.setState({ imagesCount });
      // Load images
      const imgCnt = imagesCount.toString();
      setimagescount(imgCnt);
      let img = [];
      for (var i = 1; i <= imgCnt; i++) {
        const image = await tipster.methods.images(i).call();
        // setimages([...images, image]);
        img.push(image);
      }
      setimages(img);
      // Sort images. Show highest tipped images first
      // setimages(images.sort((a, b) => b.tipAmount - a.tipAmount));
      setloading(false);
    } else {
      window.alert("Tipster contract not deployed to detected network.");
    }
  };

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setbuffer(Buffer(reader.result));
      // this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", buffer);
    };
  };

  const uploadImage = (description) => {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    ipfs.add(buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }

      setloading({ loading: true });
      tipster.methods
        .uploadImage(result[0].hash, description)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          setloading(false);
          // this.setState({ loading: false });
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

  const tipImageOwner = (id, tipAmount) => {
    // this.setState({ loading: true });
    setloading(true);
    tipster.methods
      .tipImageOwner(id)
      .send({ from: account, value: tipAmount })
      .on("transactionHash", (hash) => {
        // this.setState({ loading: false });
        setloading(false);
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
  };

  console.log(usersPosts);
  // const queryParams = new URLSearchParams(
  //   "http://localhost:3002/profile/?id=4"
  // );
  // const id = queryParams.get("id");
  // console.log(id);

  // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
  // var url = new URL(url_string);
  // var c = url.searchParams.get("c");
  // console.log(c);
  return (
    <div className="container-fluid bg-white">
      <div className="row">
        {/* <Navbar account={this.state.account} /> */}
        {loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <ProfileHeader account={account} images={usersPosts} />
        )}

        {
          <ProfileBody
            images={usersPosts}
            captureFile={captureFile}
            uploadImage={uploadImage}
            tipImageOwner={tipImageOwner}
          />
        }
        {/* <p>{console.log(this.props.location.state.id)}</p> */}
      </div>
    </div>
  );
};

export default Profile;

import Tipster from "../abis/Tipster.json";
import React from 'react';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import Web3 from "web3";
import Header from './Header';
import Message from './Message';

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values


function DirectMessage(props) {
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
      });
  };

  console.log(usersPosts);

    return(
        <div>
            <Header account={account} images={usersPosts}  />
            <Message images={usersPosts} />

        </div>
    )
}

export default DirectMessage;
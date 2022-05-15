import Tipster from '../abis/Tipster.json'
import React, { Component } from 'react';
import photo from '../photo.png';
import send from '../send.jpg';
import PaySend from './PaySend';
import PayReceive from './PayReceive';
import PayRecords from './PayRecords';
import Web3 from 'web3';
import Notify from 'bnc-notify'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

const options = {
  dappId: '07dd3134-f6e3-4fa1-8300-c06eb7fc0e72',
  networkId: 3,
  darkMode: true,
}

// initialize notify
const notify = Notify(options)

class Pay extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load accounts
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Tipster.networks[networkId]
    if(networkData) {
      const tipster = new web3.eth.Contract(Tipster.abi, networkData.address)
      this.setState({ tipster })
      const imagesCount = await tipster.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await tipster.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('Tipster contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.tipster.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        // pass the hash to notify.hash function for transaction updates and notifications
        const { emitter } = notify.hash(hash)

        // use emitter to listen to transaction events
        emitter.on('txSent', console.log)
        emitter.on('txPool', console.log)
        emitter.on('txConfirmed', console.log)
        emitter.on('txSpeedUp', console.log)
        emitter.on('txCancel', console.log)
        emitter.on('txFailed', console.log)
        emitter.on('all', console.log)
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.tipster.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      // pass the hash to notify.hash function for transaction updates and notifications
        const { emitter } = notify.hash(hash)

        // use emitter to listen to transaction events
        emitter.on('txSent', console.log)
        emitter.on('txPool', console.log)
        emitter.on('txConfirmed', console.log)
        emitter.on('txSpeedUp', console.log)
        emitter.on('txCancel', console.log)
        emitter.on('txFailed', console.log)
        emitter.on('all', console.log)
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      tipster: null,
      images: [],
      loading: true
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }


  render() {
    return (
        <div className="container-fluid bg-white mt-3">
            <div className="row">
                    
            <div className="container-fluid bg-white">
           <div className="row">
        
                <div className="col mt-5" align='center'>
                <img src={photo} width="100" height="100" className="d-inline-block align-top" alt="" /> <span></span>
                </div>
        </div>
      </div>

      <div className="container-fluid bg-white mt-3">
           <div className="row">

               <div className="col ml-4">
                <img src={send} width="500" height="500" className="d-inline-block align-top" alt="" />
                </div>

              <div className="col mt-5 text-center rounded-circle m-4" align='right'>
                <h2 style={{fontFamily: 'fantasy'}} className="text-success">
                  SEND / RECEIVE
                </h2>
                <p style={{fontSize: '20px', letterSpacing: '1px', lineHeight: '2', fontFamily: 'Georgia, serif'}} className='mt-2'>
                      Send and receive funds from friends accross the platform<br/>
                      like you want it. This is more than a social platform.<br/>
                      Enjoy the experience!!!<br/>
                  </p>
                <div className='mt-2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <PaySend />
                { 
                  <PayReceive 
                  account={this.state.account}
                  />
                }
                <PayRecords />
                </div>
                </div>

                </div>
                </div>

            </div>
      </div>
    );
  }
}

export default Pay;
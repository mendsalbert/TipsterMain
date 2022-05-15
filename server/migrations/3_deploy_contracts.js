const contracts = [
    `Sender.sol`,
    `Receiver.sol`
  ]
  
  module.exports = deployer =>
    contracts.map(contract => deployer.deploy(artifacts.require(contract)))
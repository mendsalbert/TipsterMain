const Tipster = artifacts.require("Tipster");

module.exports = function(deployer) {
  deployer.deploy(Tipster);
};
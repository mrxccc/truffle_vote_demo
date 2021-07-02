const Voting = artifacts.require("Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting,{gas:1000000});
};

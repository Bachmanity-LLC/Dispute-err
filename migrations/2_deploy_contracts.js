var Dispute = artifacts.require("./Dispute.sol");

module.exports = function(deployer) {
  deployer.deploy(Dispute);
};

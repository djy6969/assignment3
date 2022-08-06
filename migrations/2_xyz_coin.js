var xyz = artifacts.require("./XYZCoin.sol");
module.exports = function(deployer) {
  deployer.deploy(xyz);
};

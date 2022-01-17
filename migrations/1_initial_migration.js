const Migrations = artifacts.require("Migrations");
const Dinstagram = artifacts.require("Dinstagram");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Dinstagram);
};
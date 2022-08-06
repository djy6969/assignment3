const truffleAssert = require('truffle-assertions');
const XYZCoin = artifacts.require("./XYZCoin.sol");

contract("XYZCoin", async accounts => {
    it("The initial token balance of the creator account is equal to the total token supply", async () => {
        const xyzCoinInstance = await XYZCoin.deployed();
        const balance = await xyzCoinInstance.balanceOf(accounts[0]);
        const totalSupply = await xyzCoinInstance.totalSupply();

        assert.equal(balance.valueOf(), totalSupply.valueOf(), "balance and total supply not equal");
    });
    it("should transfer correctly", async () => {
    const xyzCoinInstance = await XYZCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (
      await xyzCoinInstance.balanceOf(accountOne)).toNumber();
    const accountTwoStartingBalance = (
      await xyzCoinInstance.balanceOf(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await xyzCoinInstance._transfer(accountOne, accountTwo, amount);

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (
      await xyzCoinInstance.balanceOf(accountOne)).toNumber();
    const accountTwoEndingBalance = (
      await xyzCoinInstance.balanceOf(accountTwo)).toNumber();

    assert.equal(
      accountOneEndingBalance,
      accountOneStartingBalance - amount,
      "Amount wasn't correctly transfer from the sender"
    );

    it("The allowance can be set and read", async () => {
        const allowance = await xyzCoinInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowed[0][0], allowance, "allowance can not be set and read");
    });

    it("The insufficient balance throw error", async () => {
        const balance = await xyzCoinInstance.balanceOf(accounts[0]);
        await xyzCoinInstance._transfer(accounts[0], accounts[1], 200000);
        truffleAssert.eventNotEmitted(err, 'Transfer');
    });

});

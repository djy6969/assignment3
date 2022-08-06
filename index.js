const Web3 = require("web3")

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/be3294f85a5e447e9a979540b783ea16"))
let num = 0;
var accounts = web3.eth.getAccounts();
function getBlockNumber(accounts) {
    for (let i=0;i<length(accounts);i++){
        web3.eth.getBlockTransactionCount(accounts[i],function(err,result){
            if (err) {
            console.log(err)
          } else if (result === 0){
            num++;
          }
        })
    }
    console.log(num)
}




const ethers = require('ethers');
const EthDater = require('ethereum-block-by-date')
const marketplace_ABI = require('../abis/marketplace_ABI.json')

address = '0xF4985070Ce32b6B1994329DF787D1aCc9a2dd9e2'
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/039b475c7f054d27b37fcc0c299c891e");
const contract = new ethers.Contract(address, marketplace_ABI, provider);

console.log('contract', contract)

const getAuctionEvents = async () => {
  
  const dater = new EthDater(provider);
  const now = await dater.getDate();
  let endBlock = now.block;
  let startBlock = endBlock - 700000;

  const filter = contract.filters.AuctionSuccessful();

  const events = await contract.queryFilter(filter, startBlock, endBlock)
  
  events.forEach( event => {
    console.log(event);  
    const data = {
        timestamp : event.blockNumber.timestamp,
        blockNumber : event.blockNumber,
        txHash : event.transactionHash,
        ID : ethers.utils.formatUnits(event.args[1]._hex),
        price : ethers.utils.formatUnits(event.args[2]._hex)
    }
    console.log(data);
  });
  
  
} 

module.exports = { getAuctionEvents }



//console.log(contract)






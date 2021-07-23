const ethers = require('ethers');
const EthDater = require('ethereum-block-by-date')
const axieCore_ABI = require('../abis/axieCore_ABI.json')
const USDT_ABI = require('../abis/USDT_ABI.json')

address = '0x8c811e3c958e190f5ec15fb376533a3398620500' 
const provider = new ethers.providers.JsonRpcProvider("https://api.roninchain.com/rpc");
const contract = new ethers.Contract(address, axieCore_ABI, provider);

const getRoninTransfersTotal = async () => {  
  
  const dater = new EthDater(provider);
  const now = await dater.getDate();
  let endBlock = now.block;
  let startBlock = endBlock - 100;

  const filter = contract.filters.Transfer();

  let totalTransfers = []

  const pull = async (filter, start, end) => {

    while(start > 1){
      const events = await contract.queryFilter(filter, start, end)
      const args = events.map(event => event.args)    
      console.log(args);
      totalTransfers.forEach(Transfer => {totalBlocks.push(args)})
      start = start - 10000;
      end = end - 10000;
    }  
    return totalBlocks;
  } 

  const transfers = await pull(filter, startBlock, endBlock);

}

const getRoninTransfersRange = async () => {
  
  const dater = new EthDater(provider);
  const now = await dater.getDate();
  let endBlock = now.block;
  let startBlock = endBlock - 100;

  const filter = contract.filters.Transfer();

  let transfers = []

  const events = await contract.queryFilter(filter, startBlock, endBlock)
  events.forEach( event => {
    console.log(event)
    
  });
  
} 


module.exports = { getRoninTransfersTotal, getRoninTransfersRange }






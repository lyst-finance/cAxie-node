const ethers = require('ethers');
const EthDater = require('ethereum-block-by-date')
const axie_ABI = require('../abis/axieCore_ABI.json')

address = '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d'
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/039b475c7f054d27b37fcc0c299c891e");
const contract = new ethers.Contract(address, axie_ABI, provider);

console.log('contract', contract)

const getTransfersTotal = async () => {

  const dater = new EthDater(provider)
  const now = await dater.getDate()
  let endBlock = now.block;
  let startBlock = endBlock - 100000;

  const filter = contract.filters.Transfer();

  const getTransferBlocks = async (filter, start, end) => {
    console.log('filter : ', filter, `start : ${start} end : ${end}`)
    let totalBlocks = [];
    const events = await contract.queryFilter(filter, start, end)
    console.log(events)
    //return totalBlocks;
  }

  await getTransferBlocks(filter, startBlock, endBlock);

}

const getMainnetTransfersRange = async () => {
  
  const dater = new EthDater(provider);
  const now = await dater.getDate();
  let endBlock = now.block;
  let startBlock = endBlock - 100000;

  const filter = contract.filters.Transfer();

  let transfers = []

  const events = await contract.queryFilter(filter, startBlock, endBlock)
  events.forEach( event => {
    const txHash = event.transactionHash
    const axieId = ethers.utils.formatUnits(event.args[2]._hex);
    const data = {
      txHash, 
      blockNumber: event.blockNumber,
      axieId,
    }
    transfers.push(data);
  });
  
  return transfers
} 

module.exports = { getMainnetTransfersRange }



//console.log(contract)






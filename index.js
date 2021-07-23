require('dotenv').config();
const { getRoninTransfersTotal, getRoninTransfersRange } = require('./src/subscribers/ronnin-scrape');
const { getMainnetTransfersRange } = require('./src/subscribers/mainnet-axie-feed')
const { getAuctionEvents } = require('./src/subscribers/marketplace')
const { addToDatabase } = require('./src/models/ronin-scrape')

const run = async () => {

    const marketplaceResponse = await getAuctionEvents();
    console.log(marketplaceResponse)
    //const ronninResponse = await getRoninTransfersRange();
    //console.log(mainnetResponse)
    // const roninResponse = await getRoninTransfersRange();
    // //console.log(roninResponse);
    // // roninResponse.forEach(log => {
    // //     log.forEach(transfer => {
    // //         const record = {log : transfer};
    // //         addToDatabase(record)
    // //     });
    // // });
}

run();
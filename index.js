const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function() {

  // connect to twitter via api
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  
  // pull next tweet from spreadsheet
  const sheet = new Sheet();
  await sheet.load();
  const facts = await sheet.getRows();
  const status = facts[0].fact;
  
  // send tweet
  client.post('statuses/update', {status},  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body.
  });
  
  // remove quote from spreadsheet
  await facts[0].delete();

  console.log('tweeted', facts[0].fact);
})()
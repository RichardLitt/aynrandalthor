var TwitterBot = require('node-twitterbot').TwitterBot
var fs = require('fs')
var r = require('random-js')()
var quotes = require('./quotes.json')
var _ = require('lodash')

// Include your access information below
var Bot = new TwitterBot({
  'consumer_key': 'DbZkKLzlc8crgWR1YjShMQ8DI',
  'access_token': '4519617195-9kejHV2fXaVgEVJxsxoSt4NsCXSszwdVmNhOJ8x',
  'consumer_secret': process.env.AYN_CONSUMER_SECRET,
  'access_token_secret': process.env.AYN_ACCESS_TOKEN_SECRET
})

function pickTweet () {
  var quote = r.pick(_.filter(quotes, { 'tweeted': false }))
  quote.tweeted = true
  Bot.tweet(quote.quote)
  fs.writeFile('quotes.json', JSON.stringify(quotes, null, 4), encoding='utf8', function (err) {
    if (err) throw err;
  })
}

pickTweet()

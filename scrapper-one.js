const axios = require("axios")
const cheerio = require('cheerio');


axios
  .get("https://www.forextradingbig.com/instaforex-broker-review/")
  .then((response) => {
    //handling the success
    const html = response.data;

    //loading response data into a Cheerio instance
    const $ = cheerio.load(html);

    //selecting the elements with the data
    const scrapedata = $("a", ".comment-bubble").text();

    //outputting the scraped data
    console.log(scrapedata);
  })
  //handling error
  .catch((error) => {
    console.log(error);
  });
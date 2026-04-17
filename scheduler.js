const { checkSite } = require("./monitor");
const config = require("./config");

console.log("Fodubu Security Monitor started...");

setInterval(() => {
  checkSite();
}, config.interval);

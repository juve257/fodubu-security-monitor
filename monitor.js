const axios = require("axios");
const config = require("./config");
const { log } = require("./logger");

async function checkSite() {
  const start = Date.now();

  try {
    const res = await axios.get(config.targetUrl, {
      timeout: config.timeout
    });

    const latency = Date.now() - start;

    log(`UP ${res.status} ${latency}ms`);

    return {
      status: res.status,
      latency
    };

  } catch (err) {
    log(`DOWN ${err.message}`);

    return {
      status: "DOWN",
      error: err.message
    };
  }
}

module.exports = { checkSite };

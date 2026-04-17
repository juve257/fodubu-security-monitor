const fs = require("fs");

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  console.log(line);
  fs.appendFileSync("monitor.log", line);
}

module.exports = { log };

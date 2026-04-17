const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;
// Serve dashboard
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

// Read logs
app.get("/logs", (req, res) => {
  try {    const logs = fs.readFileSync("monitor.log", "utf-8");
    res.send(logs.split("\n").slice(-50)); // last 50 logs
  } catch (err) {
    res.send([]);
  }
});

app.listen(PORT, () => {
  console.log(`Dashboard running on http://localhost:${PORT}`);
});

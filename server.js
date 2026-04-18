const express = require("express");
const fs = require("fs");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

let isLoggedIn = false;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
app.use(session({
  secret: "security-dashboard-secret",
  resave: false,
  saveUninitialized: false
}));

// LOGIN ACTION
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    req.session.loggedIn = true;
    res.redirect("/");
  } else {
    res.send("Wrong credentials");
  }
});

// DASHBOARD (PROTECTED)
app.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  res.sendFile(__dirname + "/dashboard.html");
});

// LOGS
app.get("/logs", (req, res) => {
  try {
    const logs = fs.readFileSync("logs.txt", "utf-8");
    res.send(logs);
  } catch (err) {
    res.send("No logs found");
  }
});

// ADD LOG
app.get("/add-log", (req, res) => {
  const time = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;

  res.send("Log added: " + time + " - " + ip);
});

app.get("/login", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Admin Login</title>
      <style>
        body {
          background: #0f172a;
          color: white;
          font-family: Arial;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .box {
          background: #1e293b;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
        }

        input {
          display: block;
          margin: 10px auto;
          padding: 10px;
          width: 200px;
          border-radius: 5px;
          border: none;
        }

        button {
          padding: 10px;
          background: #22c55e;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }

        h2 {
          color: #38bdf8;
        }
      </style>
    </head>

    <body>
      <div class="box">
        <h2>🔐 Admin Login</h2>
        <form method="POST" action="/login">
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.get("/login", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Login</title>
    </head>
    <body>
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
});

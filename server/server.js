const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/register", async (req, res) => {
  //   const { firstName, lastName, username, password, confirmPassword } = req.body;

  res.status(201).json({
    success: true,
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

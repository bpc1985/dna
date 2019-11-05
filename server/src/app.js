const express = require("express");
const cors = require('cors');
const port = process.env.PORT;
const userRouter = require("./routers/user");
const subscriptionRouter = require("./routers/subscription");
const packageRouter = require("./routers/package");

require("./db/db");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(userRouter);
app.use(subscriptionRouter);
app.use(packageRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

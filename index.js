const exprses = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./configuration/dbCon");

const categoryRoute = require("./routes/category");
const vehicleRoute = require("./routes/vehicle");
const userRoute = require("./routes/user");

const PORT = process.env.PORT;
const app = exprses();

app.use(exprses.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get('/', (req,res) =>  {
  res.status(200).json({success: true, data: 'Hello'})
})

app.use("/api/category", categoryRoute);
app.use("/api/vehicle", vehicleRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

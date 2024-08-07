require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./Config/Databasetasksystem");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRouters");
const port = process.env.PORT;

app.use(
  cors({
    credentials: true, // السماح بأرسال المعلومات مثل الكوكيز  والتوكنز
    origin: "http://localhost:5173", // يسمح فقط بأرسال المعلومات لهاذا الرابط هذا رابط الفرونت اند
  })
);

app.use(express.json()); // js الى json  يتم تحويل البيانات من
app.use(cookieParser()); // js الى cookie التحويل من

app.get("/", (req, res) => {
  res.send("Hello World! \n go to http://localhost:3000/alldata");
});

// عرض جميع البيانات
app.get("/alldata", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows); // json تخزين البيانات في ال
    console.log("done");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

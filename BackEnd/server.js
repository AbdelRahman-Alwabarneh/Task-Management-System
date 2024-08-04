const express = require("express");
const app = express();
const db = require("./Databasetasksystem");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const port = 3000;

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

// انشاء حساب جديد
app.post("/signup", async (req, res) => {
  try {
    const { First_Name, Last_Name, Email, Password } = req.body;

    // التشيك على الأيميل اذا موجود او لا
    const emailCheck = await db.query(
      'SELECT * FROM users WHERE "Email" = $1',
      [Email]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10); // كود تشفير الباسورد

    // كود تخزين الأيميل في الداتابيس
    const NewAccount = await db.query(
      'INSERT INTO users("First_Name", "Last_Name", "Email", "Password") VALUES($1, $2, $3, $4) RETURNING *',
      [First_Name, Last_Name, Email, hashedPassword]
    );

    const user = NewAccount.rows[0];
    const payload = {
      id: user.id,
      First_Name: user.First_Name,
      Last_Name: user.Last_Name,
    };

    const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // تعيين التوكن في ملف تعريف الارتباط
    res.cookie("authToken", token, {
      // اسم الكوكبز والبيانات الي داخل الكوكيز
      httpOnly: true, // لا يمكن الوصول او التعديل على الكوكيز عن طريق الجافا سكربت في المتصفح
      secure: process.env.NODE_ENV === "production", //cors لاكن في حالتي يعمل لأني استدعيت رابط الفرونت اند في ال  http وليس  https ارسال الكوكيز عند ما يكون الرابط
      sameSite: "strict", // يتم ارسال الكوكيز فقط مع الطلبات التي تأتي مع نفس الرابط
      maxAge: 3600000, // مدة صلاحية الكوكيز في الملي ثانية هاي المدة ساعة
    });

    // json ارسال البيانات على شكل
    res.status(201).json(NewAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// تسجيل الدخول
app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const findUser = await db.query(
      'SELECT * FROM users WHERE "Email" = $1',
      [Email]
    ); // البحث عن الأيميل

    if (findUser.rows.length > 0) {
      const user = findUser.rows[0];
      const PasswordCorrect = await bcrypt.compare(Password, user.Password);

      if (PasswordCorrect) {
        const payload = {
          id: user.id,
          First_Name: user.First_Name,
          Last_Name: user.Last_Name,
        };

        const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        // تعيين التوكن في ملف تعريف الارتباط
        res.cookie("authToken", token, {
          // اسم الكوكبز والبيانات الي داخل الكوكيز
          httpOnly: true, // لا يمكن الوصول او التعديل على الكوكيز عن طريق الجافا سكربت في المتصفح
          secure: process.env.NODE_ENV === "production", //cors لاكن في حالتي يعمل لأني استدعيت رابط الفرونت اند في ال  http وليس  https ارسال الكوكيز عند ما يكون الرابط
          sameSite: "strict", // يتم ارسال الكوكيز فقط مع الطلبات التي تأتي مع نفس الرابط
          maxAge: 3600000, // مدة صلاحية الكوكيز في الملي ثانية هاي المدة ساعة
        });
        res.status(200).json({ message: "Logged in successfully" });
      } else {
        res.status(400).send("Invalid credentials");
      }
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

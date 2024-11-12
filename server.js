const express = require("express");
const connectDB = require("./db");
const userMailRoutes = require("./routes/userMailRoutes");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const app = express();

// Підключення до бази даних
connectDB();

// Middleware для парсингу JSON даних
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // для парсингу даних форми

// Налаштування сесій
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Налаштування EJS як шаблонізатора
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

// Маршрут для відображення сторінки входу
app.get("/login", (req, res) => {
  res.render("login");
});

// Маршрут для обробки даних форми входу
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //Перевірка логіну та паролю
  if (username == "Zhuyka" && password === "5195454q") {
    req.session.user = username;
    return res.redirect("/readMail");
  } else {
    res.send("Неправильний логін або пароль");
  }
});

// Захист маршруту
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user == "Zhuyka") {
    return next();
  } else {
    res.redirect("/login");
  }
};
// Routing for main page
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "main.html"));
});

// Routing for main Ukr page
app.get("/mainuk", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "mainUk.html"));
});

// Маршрут для адмін-панелі
app.get("/admin", requireLogin, (req, res) => {
  res.render("admin");
});

// Маршрут для сторінки readMail
app.get("/readMail", requireLogin, (req, res) => {
  res.render("readMail"); // тут використовуйте свій EJS шаблон
});

// Використання роутів для UserMail
app.use("/api", userMailRoutes);

// Обслуговування статичних файлів з папки 'public'
app.use(express.static(path.join(__dirname, "public")));

// Маршрут для рендерингу HTML-сторінки з динамічним контентом
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "MainUk.html"));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

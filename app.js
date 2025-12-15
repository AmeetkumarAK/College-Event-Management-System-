import express from "express";
import cors from "cors";
import db from "./models/mysql.js";

const app = express();

/* ✅ MIDDLEWARE FIRST */
app.use(cors());
app.use(express.json());   // 👈 MUST be before routes

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("College Event Management Backend Running");
});
app.use(express.json()); // MUST be at top

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});


/* ---------- EVENTS ---------- */
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.post("/events", (req, res) => {

  const { event_id, event_name, event_date, location } = req.body;

  const sql = `
    INSERT INTO events (event_id, event_name, event_date, location)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [event_id, event_name, event_date, location], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Event added successfully" });
  });
});

/* ---------- STUDENTS ---------- */
app.post("/students", (req, res) => {
  const { student_id, name, department, email } = req.body;
  const sql = "INSERT INTO students VALUES (?, ?, ?, ?)";

  db.query(sql, [student_id, name, department, email], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student added successfully" });
  });
});

/* ---------- REGISTRATION ---------- */
app.post("/register", (req, res) => {
  const { reg_id, student_id, event_id } = req.body;
  const sql = "INSERT INTO registrations VALUES (?, ?, ?)";

  db.query(sql, [reg_id, student_id, event_id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Registered successfully" });
  });
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

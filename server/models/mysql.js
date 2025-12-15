import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123", // 🔴 ADD PASSWORD HERE
  database: "college_event_management"
});

db.connect(err => {
  if (err) {
    console.log("❌ MySQL Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

export default db;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const secret = "bjdsadui32hr3278bdsnadasndk";

exports.register = async (req, res) => {
  const { full_name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const [rows] = await db.query(
      "INSERT INTO users (full_name, username, password) VALUES (?, ?, ?)",
      [full_name, username, hashedPassword]
    );
    res.status(201).json({ id: rows.insertId, full_name, username });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

exports.getUserList = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, username, status FROM users"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id, full_name, username, status FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    await db.query(
      "UPDATE users SET full_name = ?, username = ?, password = ? WHERE id = ?",
      [full_name, username, hashedPassword, id]
    );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

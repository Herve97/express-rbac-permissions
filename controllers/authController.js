const User = require("../models/user");
const Role = require("../models/role");

// Register a new user with a role
exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, role });

  User.register(user, password, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User registered successfully" });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  User.authenticate(username, password, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a new session and store user id
    req.session.userId = user._id;

    res.json({ message: "Login successful" });
  });
};

exports.showAll = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

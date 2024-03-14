import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password,
    });

    user.password = await user.encryptPassword(password);

    await user.save();

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("There was a problem registering your user");
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("No user found.");
  }
  res.status(200).json(user);
};

export const signinController = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }
  const validPassword = await user.comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ auth: true, token });
};

export const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

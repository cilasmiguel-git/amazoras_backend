import express from 'express';
import User from '../models/useModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const signinUser = await User.findOne({ email, password });

    if (signinUser) {
      res.json({
        status: 'success',
        data: {
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser)
        }
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
    console.log(error);
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'CilasMiguel',
      email: 'miguelcilascolacobezerramiguel@gmail.com',
      password: '123456',
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ msg: error.message });
    console.log(error);
  }
});

router.get('/createuser', async (req, res) => {
  try {
    const user = new User({
      name: 'josefa',
      email: 'josefa@gmail.com',
      password: '123456',
      isAdmin: false
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ msg: error.message });
    console.log(error);
  }
});
export default router;

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    } else {
      const user = new User({
        name,
        email,
        password,
        isAdmin: false
      });

      const newUser = await user.save();

      res.status(201).json({
        status: 'success',
        data: {
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser)
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
    console.log(error);
  }
});

router.post('/logout', (req, res) => {
  // Limpe o token armazenado no cliente
  res.clearCookie('token');

  res.json({
    status: 'success',
    message: 'Logout successful'
  });
});

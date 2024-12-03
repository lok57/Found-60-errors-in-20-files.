import express from 'express';
import { auth } from '../config/firebase.js';

const router = express.Router();

router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await auth.verifyIdToken(token);
    res.json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
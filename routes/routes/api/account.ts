import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataFile = path.join(__dirname, '../../../data/accounts.json');

// Read accounts
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading account data');
  }
});

// Write new account
router.post('/', (req, res) => {
  const { name, balance } = req.body;
  if (!name || balance == null) {
    return res.status(400).send('Missing account name or balance');
  }

  try {
    const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf-8')) : [];
    data.push({ name, balance });
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.status(201).send('Account created');
  } catch (err) {
    res.status(500).send('Error writing account data');
  }
});

export default router;
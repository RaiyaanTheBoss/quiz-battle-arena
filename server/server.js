const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Result = require('./models/Result');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Quiz Battle Arena backend is running!'
  });
});

// Save quiz result
app.post('/api/results', async (req, res) => {
  try {
    const result = await Result.create(req.body);

    res.status(201).json({
      message: 'Quiz result saved successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save quiz result'
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
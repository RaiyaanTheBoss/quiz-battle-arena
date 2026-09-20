require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const Result = require('./models/Result');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();


// ======================================================
// DATABASE
// ======================================================

connectDB();


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


// ======================================================
// AUTH ROUTES
// ======================================================

app.use('/api/auth', authRoutes);


// ======================================================
// TEST ROUTE
// ======================================================

app.get('/', (req, res) => {
  res.json({
    message: 'Quiz Battle Arena backend is running!'
  });
});


// ======================================================
// SAVE QUIZ RESULT
// ======================================================
// This route requires a valid JWT token.
// The userId is taken from the verified token,
// NOT from the frontend request body.
// ======================================================

app.post('/api/results', authMiddleware, async (req, res) => {

  try {

    const {
      category,
      score,
      totalQuestions,
      accuracy
    } = req.body;


    // --------------------------------------------------
    // VALIDATE QUIZ DATA
    // --------------------------------------------------

    if (
      !category ||
      score === undefined ||
      totalQuestions === undefined ||
      accuracy === undefined
    ) {

      return res.status(400).json({
        message: 'Category, score, totalQuestions and accuracy are required'
      });

    }


    // --------------------------------------------------
    // CREATE RESULT
    // --------------------------------------------------

    const result = await Result.create({

      // User ID comes from verified JWT
      userId: req.user.userId,

      // Quiz data comes from frontend
      category: category,
      score: score,
      totalQuestions: totalQuestions,
      accuracy: accuracy

    });


    // --------------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------------

    res.status(201).json({

      message: 'Quiz result saved successfully',

      result

    });

  } catch (error) {

    console.error('Failed to save quiz result:', error);

    res.status(500).json({

      message: 'Failed to save quiz result'

    });

  }

});

// =========================
// GET MY QUIZ HISTORY
// =========================

app.get('/api/results/my-results', authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json(results);

  } catch (error) {
    console.error('Failed to fetch quiz history:', error);

    res.status(500).json({
      message: 'Failed to fetch quiz history'
    });
  }
});

app.get('/api/results/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: '$userId',
          totalScore: { $sum: '$score' },
          matches: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalScore: -1
        }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          username: '$user.username',
          totalScore: 1,
          matches: 1
        }
      }
    ]);

    res.json(leaderboard);

  } catch (error) {
    console.error('Leaderboard error:', error);

    res.status(500).json({
      message: 'Failed to load leaderboard'
    });
  }
});

// ======================================================
// START SERVER
// ======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
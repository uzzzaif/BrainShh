const recordMood = async (req, res, next) => {
  try {
    const { mood } = req.body;
    res.status(201).json({ mood, recordedAt: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

const getMoodHistory = async (req, res, next) => {
  try {
    res.json([]);
  } catch (error) {
    next(error);
  }
};

module.exports = { recordMood, getMoodHistory };

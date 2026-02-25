const { reviewResume } = require('../services/bedrock');
// TODO: import db when RDS is provisioned
// const db = require('../services/db');

/**
 * POST /reviews
 * Receives uploaded resume file, runs AI review, saves result.
 * Stub — real implementation requires S3, Bedrock, and RDS.
 */
async function createReview(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded. Use field name "resume".' });
    }

    const { originalname, buffer, mimetype } = req.file;
    const userId = req.user.userId;

    // TODO: upload file to S3
    // const s3Key = await uploadToS3(buffer, originalname);

    // TODO: extract text from file (pdf-parse / mammoth / plain read)
    // const resumeText = await extractText(buffer, mimetype);

    // STUB: call Bedrock service (returns mock result while AWS is unavailable)
    const aiResult = await reviewResume('[stub resume text]');

    // TODO: save review to DB
    // await db.query(
    //   `INSERT INTO reviews (user_id, filename, s3_key, overall_score, result_json)
    //    VALUES ($1, $2, $3, $4, $5)`,
    //   [userId, originalname, s3Key, aiResult.overall_score, JSON.stringify(aiResult)]
    // );

    // STUB response
    const review = {
      id: 1,
      user_id: userId,
      filename: originalname,
      s3_key: 'stub/s3/key',
      overall_score: aiResult.overall_score,
      result_json: aiResult,
      created_at: new Date().toISOString(),
    };

    return res.status(201).json({ message: 'Review created (stub)', review });
  } catch (err) {
    console.error('createReview error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /reviews
 * Returns all reviews for the authenticated user.
 * Stub — real implementation requires RDS.
 */
async function getAllReviews(req, res) {
  try {
    const userId = req.user.userId;

    // TODO: query DB
    // const result = await db.query(
    //   'SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC',
    //   [userId]
    // );
    // return res.json(result.rows);

    // STUB response
    return res.json({
      message: 'getAllReviews (stub)',
      reviews: [
        {
          id: 1,
          user_id: userId,
          filename: 'sample_resume.pdf',
          overall_score: 82,
          created_at: new Date().toISOString(),
        },
      ],
    });
  } catch (err) {
    console.error('getAllReviews error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /reviews/:id
 * Returns a single review by ID.
 * Stub — real implementation requires RDS.
 */
async function getReviewById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // TODO: query DB
    // const result = await db.query(
    //   'SELECT * FROM reviews WHERE id = $1 AND user_id = $2',
    //   [id, userId]
    // );
    // if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    // return res.json(result.rows[0]);

    // STUB response
    return res.json({
      message: 'getReviewById (stub)',
      review: {
        id: Number(id),
        user_id: userId,
        filename: 'sample_resume.pdf',
        s3_key: 'stub/s3/key',
        overall_score: 82,
        result_json: await reviewResume('[stub resume text]'),
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('getReviewById error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createReview, getAllReviews, getReviewById };

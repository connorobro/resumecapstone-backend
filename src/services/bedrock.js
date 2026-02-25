/**
 * Bedrock Service — AWS Bedrock (Claude) integration.
 *
 * TODO: Replace the stub below with real AWS SDK calls once AWS credentials
 * and model access are approved.
 *
 * Real implementation will use:
 *   @aws-sdk/client-bedrock-runtime — BedrockRuntimeClient, InvokeModelCommand
 *   Model: anthropic.claude-3-sonnet-20240229-v1:0
 */

// TODO: Uncomment when AWS is available.
// const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
//
// const client = new BedrockRuntimeClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// ---------------------------------------------------------------------------
// System prompt embedding the California Community College standards.
// This will be sent to Claude as the system message.
// ---------------------------------------------------------------------------
// const CCC_SYSTEM_PROMPT = `
// You are an expert resume reviewer trained on California Community College
// career center standards. Evaluate the provided resume and return a JSON
// object with the following structure:
// {
//   "overall_score": <integer 0-100>,
//   "overall_summary": "<string>",
//   "feedback": [
//     { "category": "<string>", "score": <integer 0-100>, "explanation": "<string>" },
//     ...
//   ]
// }
// Categories to evaluate: Contact Information, Summary/Objective, Work Experience,
// Education, Skills, Formatting & Readability, Action Verbs, Quantifiable Achievements.
// Return only valid JSON with no additional commentary.
// `;

/**
 * Sends resume text to AWS Bedrock (Claude) and returns structured JSON feedback.
 *
 * @param {string} resumeText — Plain text extracted from the uploaded resume file.
 * @returns {Promise<Object>} Structured AI response (see schema below).
 */
async function reviewResume(resumeText) {
  // -------------------------------------------------------------------------
  // STUB — returns a hardcoded mock result so routes can be tested end-to-end
  // without real AWS access. Remove this block when Bedrock is available.
  // -------------------------------------------------------------------------
  console.log('[bedrock] STUB: reviewResume called. Returning mock result.');

  return {
    overall_score: 78,
    overall_summary:
      'Your resume demonstrates solid experience but would benefit from stronger action verbs and more quantifiable achievements.',
    feedback: [
      {
        category: 'Contact Information',
        score: 95,
        explanation: 'All required contact details are present and clearly formatted.',
      },
      {
        category: 'Summary / Objective',
        score: 70,
        explanation: 'The summary is present but vague. Tailor it to a specific role or field.',
      },
      {
        category: 'Work Experience',
        score: 75,
        explanation:
          'Experience is listed but most bullet points lack quantifiable results. Add numbers and impact metrics.',
      },
      {
        category: 'Education',
        score: 90,
        explanation: 'Education section is complete and well-formatted.',
      },
      {
        category: 'Skills',
        score: 80,
        explanation: 'Good range of technical skills. Consider grouping by category.',
      },
      {
        category: 'Formatting & Readability',
        score: 85,
        explanation: 'Clean layout with consistent fonts. Margins could be slightly wider.',
      },
      {
        category: 'Action Verbs',
        score: 65,
        explanation: 'Several bullet points begin with weak verbs. Replace with strong action verbs.',
      },
      {
        category: 'Quantifiable Achievements',
        score: 60,
        explanation:
          'Only one measurable achievement found. Aim for at least 3–5 across your experience.',
      },
    ],
  };

  // -------------------------------------------------------------------------
  // TODO: Real Bedrock implementation (uncomment when AWS access is granted).
  // -------------------------------------------------------------------------
  // const payload = {
  //   anthropic_version: 'bedrock-2023-05-31',
  //   max_tokens: 2048,
  //   system: CCC_SYSTEM_PROMPT,
  //   messages: [{ role: 'user', content: resumeText }],
  // };
  //
  // const command = new InvokeModelCommand({
  //   modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
  //   contentType: 'application/json',
  //   accept: 'application/json',
  //   body: JSON.stringify(payload),
  // });
  //
  // const response = await client.send(command);
  // const raw = JSON.parse(Buffer.from(response.body).toString('utf8'));
  // return JSON.parse(raw.content[0].text);
}

module.exports = { reviewResume };

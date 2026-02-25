# Resume Reviewer — Backend

## Project Overview
An AI-powered resume reviewer that scores resumes against California Community College standards. Users create an account, log in, upload a resume, and receive an AI-generated score and feedback. All past reviews are saved and accessible from the user's dashboard.

## Full Stack
| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js / Express |
| Database | PostgreSQL (AWS RDS) |
| File Storage | AWS S3 |
| AI | AWS Bedrock (Claude) |
| Frontend Hosting | AWS Amplify |
| Backend Hosting | AWS Elastic Beanstalk |

## What the Backend Owns
- REST API consumed by the React frontend
- User authentication (register, login, JWT issuing and verification)
- Receiving uploaded resume files and forwarding them to AWS S3
- Extracting text from uploaded resumes (PDF, DOCX, TXT)
- Sending resume text to AWS Bedrock with the CCC standards system prompt
- Parsing and returning the AI response as structured JSON
- Saving and retrieving review history from PostgreSQL

## Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new user (username + password) |
| POST | `/auth/login` | Authenticate user, return signed JWT |

### Reviews
All review endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/reviews` | Upload resume, trigger AI review, save result |
| GET | `/reviews` | Return all reviews for the authenticated user |
| GET | `/reviews/:id` | Return a single review result |

## Auth
- Passwords hashed with bcrypt before storing
- On login return a signed JWT with the user ID as payload
- Middleware verifies JWT on all protected routes and attaches the user to the request

## Resume Processing Flow
1. Receive file via multipart/form-data (field name: `resume`)
2. Upload raw file to AWS S3
3. Extract plain text from the file (use `pdf-parse` for PDF, `mammoth` for DOCX, plain read for TXT)
4. Send extracted text to AWS Bedrock with the CCC standards embedded in the system prompt
5. Parse the AI response into structured JSON
6. Save the result to PostgreSQL
7. Return the result to the frontend

## Bedrock Integration
- Use the AWS SDK v3 (`@aws-sdk/client-bedrock-runtime`)
- Model: `anthropic.claude-3-sonnet-20240229-v1:0`
- The California Community College standards are embedded as a system prompt — they are not user-configurable
- The AI should return structured JSON with at minimum: `overall_score`, `overall_summary`, and a `feedback` array with per-category scores and explanations

## Database Schema

### users
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | |
| username | VARCHAR UNIQUE NOT NULL | |
| password_hash | VARCHAR NOT NULL | bcrypt |
| created_at | TIMESTAMP | default now() |

### reviews
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | |
| user_id | INTEGER | FK → users.id |
| filename | VARCHAR | original uploaded filename |
| s3_key | VARCHAR | S3 object key |
| overall_score | INTEGER | 0–100 |
| result_json | JSONB | full AI response |
| created_at | TIMESTAMP | default now() |

## Environment Variables
```
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/resume_reviewer
JWT_SECRET=your_jwt_secret
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=your_bucket_name
```

## Local Development
```bash
npm install
npm run dev
```
Runs on `http://localhost:5000`. Requires a local or remote PostgreSQL instance and valid AWS credentials in your `.env` file.

## Dependencies
```
express
pg
bcrypt
jsonwebtoken
multer
pdf-parse
mammoth
@aws-sdk/client-bedrock-runtime
@aws-sdk/client-s3
dotenv
```
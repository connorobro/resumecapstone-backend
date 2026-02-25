const multer = require('multer');

const ALLOWED_MIMETYPES = [
  'application/pdf',                                                        // PDF
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'text/plain',                                                              // TXT
];

const MAX_FILE_SIZE_MB = 5;

/**
 * Store files in memory so they can be forwarded to S3 without writing to disk.
 * TODO: Remove memoryStorage and switch to a stream-based S3 upload when AWS is available.
 */
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: PDF, DOCX, TXT.`));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
  },
});

module.exports = upload;

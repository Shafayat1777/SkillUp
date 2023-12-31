const multer = require("multer");
const { validateMIMEType } = require("validate-image-type");
const mime = require("mime-types");

// setting the image file storage destination
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/uploads/img");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    if (extension === "jpg" || extension === "jpeg") {
      cb(null, Date.now() + "_" + req.user.id + ".jpg");
    } else if (extension === "png") {
      cb(null, Date.now() + "_" + req.user.id + ".png");
    } else {
      cb(new Error("Invalid file extension"));
    }
  },
});

// Middleware to upload image
const uploadImage = multer({
  storage: imageStorage,
});

// Middleware to validate the image type adn size before uploading
const validateImage = async (req, res, next) => {
  const validImageTypes = ["image/jpeg", "image/png"]; // Add more supported image types if needed

  const result = await validateMIMEType(req.file.path, {
    allowMimeTypes: validImageTypes,
  });

  if (!result.ok) {
    return res.status(400).json({
      error: "Invalid image file. Only JPEG and PNG images are supported.",
    });
  }

  if (req.file.size > 1 * 1024 * 1024) {
    return res.status(400).json({
      error: "File too large. Max file size is 1MB.",
    });
  }

  next();
};

// setting the PDF file storage destination
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/uploads/pdf");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + req.body.lessonId + ".pdf");
  },
});

// Middleware to upload PDF
const uploadPDF = multer({
  storage: pdfStorage,
});

// Middleware to validate the PDF type and size before uploading
const validatePDF = async (req, res, next) => {
  const validFileTypes = ["application/pdf"]; // Add more supported file types if needed
  const fileMimeType = mime.lookup(req.file.originalname);

  // Check file type
  if (!validFileTypes.includes(fileMimeType)) {
    return res.status(400).json({
      error: "Invalid file type. Only PDF files are supported.",
    });
  }

  // Check file size
  if (req.file.size > 500 * 1024 * 1024) {
    return res.status(400).json({
      error: "File too large. Max file size is 5MB.",
    });
  }

  next();
};

// setting the Video file storage destination
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/uploads/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + req.body.lessonId + ".mp4");
  },
});

// Middleware to upload PDF
const uploadVideo = multer({
  storage: videoStorage,
});

module.exports = {
  uploadImage,
  validateImage,
  uploadPDF,
  validatePDF,
  uploadVideo,
};

import express from "express"; 
import AWS from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// CORS enable so frontend can access backend
app.use(cors());

// AWS Config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// 🟢 List all files
app.get("/files", (req, res) => {
  const params = { Bucket: process.env.S3_BUCKET };

  s3.listObjectsV2(params, (err, data) => {
    console.log("S3 listObjectsV2 Response:", data);

    if (err) {
      console.error("Error from S3:", err);
      return res.status(500).json({ error: "Error listing files" });
    }

    if (!data.Contents) return res.json([]);

    const files = data.Contents.map((item) => ({
      Key: item.Key,
      Size: item.Size,
      LastModified: item.LastModified,
    }));

    res.json(files);
  });
});

// 🟢 Upload file
app.post("/upload", upload.single("file"), (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
    res.json({ url: data.Location, filename: req.file.originalname });
  });
});

// 🟢 Download file
app.get("/download/:filename", (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.params.filename,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("Download error:", err);
      return res.status(500).json({ error: "Download failed" });
    }
    res.attachment(req.params.filename);
    res.send(data.Body);
  });
});

// 🟢 Delete file
app.delete("/delete/:filename", (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.params.filename,
  };

  s3.deleteObject(params, (err) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Delete failed" });
    }
    res.json({ message: "File deleted successfully" });
  });
});

// 🟢 Start server (Fixed for Render)
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
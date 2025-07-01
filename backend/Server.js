const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


app.post("/upload-pdf", upload.single("file"), async (req, res) => {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    const extractedText = docs.map(doc => doc.pageContent).join("\n\n") || "No text extracted.";

    res.json({ text: extractedText });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process uploaded PDF." });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

app.post("/api/ask", async (req, res) => {
  const { question, context } = req.body;

  if (!question || !context) {
    return res.status(400).json({ answer: "Missing question or context." });
  }

  try {
   
    const apiKey = "AIzaSyCiNpnC0dUk7tq9ycpsGGnTDRjlLTnksSA";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Answer the question based on the context below.\n\nContext:\n${context}\n\nQuestion:\n${question}`
            }
          ]
        }
      ]
    };

    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No answer found.";
    res.json({ answer });

  } catch (error) {
    console.error("❌ Gemini API error:", error?.response?.data || error.message);
    res.status(500).json({
      answer: "An error occurred while answering the question.",
      error: error?.response?.data?.error || error.message
    });
  }
});


app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

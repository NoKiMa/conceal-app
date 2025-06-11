import express, { Request, Response } from "express";
import cors from 'cors';
import fs from "fs";
import multer from "multer";
import { embedTextInFile, extractTextFromFile } from "./services/steganography";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
declare namespace Express {
  interface Response {
    download(path: string, filename?: string, callback?: (error: Error | null) => void): Response;
  }
  interface Request {
    file?: MulterFile;
    body: {
      text: string;
    };
  }
}

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors({
  origin: 'http://localhost:3001', // Указываем порт вашего Next.js приложения
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API routes
app.use("/api", (req, res, next) => {
  next();
});

app.get("/api/", (req, res) => {
    res.send("Hello World!");
});
app.post("/api/hide", upload.single("file"), async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!req.file || !text) return res.status(400).send("File and text are required");
    const resultPath = await embedTextInFile(req.file.path, text);
    res.download(resultPath, (err) => {
        if (err) {
            console.error(err);
        } else {
          fs.unlinkSync(resultPath);
          fs.unlinkSync(req.file.path);
        }
    });
});

app.post("/api/reveal", upload.single("file"), async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).send("File is required");

    const hidden = await extractTextFromFile(req.file.path);
    if (!hidden) return res.status(404).send("No hidden text found");

    res.json({ hiddenText: hidden });
    fs.unlinkSync(req.file.path);
});

app.listen(3000, () => console.log("Server started on port 3000"));

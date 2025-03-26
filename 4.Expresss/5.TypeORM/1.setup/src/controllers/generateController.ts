import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Interview } from "../Entities/Questions";
import asyncHandler from "../midllewares/asyncHandler";
import { GoogleGenerativeAI } from "@google/generative-ai";


interface questionsRequest extends Request {
  body: {
    role: string;
    level: string;
    techStack: string;
    type: string;
    amount: number;
  };
}


const QuestionsInterview = AppDataSource.getRepository(Interview);

export const generateQuestions = asyncHandler(
  async (req:questionsRequest, res: Response) => {
    const { role, level, techStack, type, amount } = req.body;


    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return res.status(500).json({ error: "Google API key is missing" });
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate content
    const prompt = `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techStack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";


    // Convert to array of questions
    const questions = text
      .split("\n")
      .map(q => q.trim().replace(/["'\-*_/\\]/g, "").replace(/^\d+\.\s*/, "")) // Remove special chars & numbering
      .filter(q => q.length > 5); // Ensure valid questions


    // Save to database
    const newInterview = QuestionsInterview.create({
      role,
      level,
      techStack,
      type,
      amount,
      questions,
    });


    await QuestionsInterview.save(newInterview);

    res.status(201).json({
      message: "Questions generated successfully",
      questions,
    });
  }
);
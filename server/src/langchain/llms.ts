import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embeddingllm = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: "AIzaSyAzsFLoTprlcRRZaA232DLD58Yh5VTC4I0",
});

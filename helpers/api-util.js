import { promises as fs } from "fs";

export async function getAllQuizzes() {
  const jsonData = await fs.readFile(process.cwd() + "/data/data.json", "utf8");
  return JSON.parse(jsonData);
}

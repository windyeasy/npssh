import fs from "fs";
import path from "path";

export function requireJson(filePath) {
  const absFilePath = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(absFilePath, "utf-8"));
}



import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件所在的目录路径
const __dirname = dirname(__filename);
export function requireJson(filePath) {
  const absFilePath = path.join(__dirname, filePath);
  return JSON.parse(fs.readFileSync(absFilePath, "utf-8"));
}

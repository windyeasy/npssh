import fs from "fs";
import path from "path"

/**
 * Converts the relative path to an absolute path
 * @param {string} relativePath 
 * @returns {string} 
 */
export function resolveAbsolutePath(relativePath) {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`The specified path does not exist: ${absolutePath}`);
  }
  return absolutePath;
}

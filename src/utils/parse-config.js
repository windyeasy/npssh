import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export function parseConfigByFilePath(filePath){
  return new Promise((resolve, reject) => {
    const extension = path.extname(filePath);
    if (extension === ".cjs") {
      const jsConfig =  require(filePath);
      resolve(jsConfig)
    } else if (extension === ".yml") {
      fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
          console.error("Error reading .yml file:", err);
          reject(err);
          return;
        }
        const ymlConfig = yaml.load(content);
        resolve(ymlConfig);
      });
    } else if (extension === ".json") {
      fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
          console.error("Error reading .json file:", err);
          reject(err);
          return;
        }
        const jsonConfig = JSON.parse(content);
        resolve(jsonConfig);
      });
    }
  });
}

/**
 * 
 * @param {string} configPrefix -- config file prefix
 * @return {Promise<Object>}
 */
export function parseConfigByWorkDir(configPrefix = '.npssh') {
  return new Promise((resolve, reject) => {
  
    const workingDirectory = process.cwd();
    
    fs.readdir(workingDirectory, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        reject(err);
        return;
      }
      files.forEach(async (file) => {
        const filePath = path.join(workingDirectory, file);
        if (file.startsWith(configPrefix)) {
          return parseConfigByFilePath(filePath).then(resolve).catch(reject)
        }
      });
    });
  });
}

export function parseConfigByConfigPath(configPath) {
  return new Promise((resolve, reject) => {
    if (!path.isAbsolute(configPath)){
      configPath = path.join(process.cwd(), configPath)
    }
    if (!fs.existsSync(configPath)){
      return reject(new Error(`The specified config path does not exist: ${configPath}`));
    }
    parseConfigByFilePath(configPath).then(resolve).catch(reject)
  });
}

import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
export function parseConfig(configPrefix = '.npssh') {
  return new Promise((resolve, reject) => {
    // 获取当前工作目录
    const workingDirectory = process.cwd();
    // 读取工作目录下的所有文件
    fs.readdir(workingDirectory, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        reject(err);
        return;
      }

      files.forEach(async (file) => {
        // 获取文件的完整路径
        const filePath = path.join(workingDirectory, file);

        // 检查文件是否以指定的前缀开始
        if (file.startsWith(configPrefix)) {
          // 获取文件类型
          const extension = path.extname(file);

          if (extension === ".cjs") {
            // 解析 .js 文件
            const jsConfig =  require(filePath);
            resolve(jsConfig)
            
          } else if (extension === ".yml") {
            // 解析 .yml 文件
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
            // 解析 .json 文件
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
        }
      });
    });
  });
}

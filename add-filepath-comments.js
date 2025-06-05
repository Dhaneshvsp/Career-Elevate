import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "app");

function addFilePathComment(filePath) {
  const ext = path.extname(filePath);
  let comment;
  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
    comment = `// filepath: ${filePath.replace(/\\/g, "/")}\n`;
  } else if ([".css", ".scss"].includes(ext)) {
    comment = `/* filepath: ${filePath.replace(/\\/g, "/")} */\n`;
  } else {
    return; // skip non-code files
  }

  const content = fs.readFileSync(filePath, "utf8");
  if (!content.startsWith(comment)) {
    fs.writeFileSync(filePath, comment + content, "utf8");
    console.log("Updated:", filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      addFilePathComment(fullPath);
    }
  });
}

walkDir(rootDir);
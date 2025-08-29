import { promises as fs } from "fs";
import path from "path";

let path_name = "C:/Users/Saheem/OneDrive/Desktop/clutter";
let files = await fs.readdir(path_name);
console.log("Files found:", files);

let ext = [];

// getting extensions
for (let iterator of files) {
  ext.push(iterator.split(".").pop());
}

// removing duplicates
ext = [...new Set(ext)];

// creating directories
for (let i of ext) {
  let folderPath = path.join(path_name, i);
  try {
    await fs.mkdir(folderPath);
    console.log(`Created folder: ${folderPath}`);
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.error(err);
    }
  }
}

// moving files (skip js + json files)
for (let file of files) {
  let extension = file.split(".").pop();
  let oldPath = path.join(path_name, file);
  let newPath = path.join(path_name, extension, file);

  if (extension !== "js" && extension !== "json") {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`Moved ${file} → ${extension}/`);
    } catch (err) {
      console.error(`Error moving ${file}:`, err);
    }
  }
}

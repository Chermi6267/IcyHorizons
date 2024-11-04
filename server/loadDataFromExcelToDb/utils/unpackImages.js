const fs = require("fs");
const path = require("path");

const defaultFolderPath = path.join(__dirname, "../../img/default");
const smallFolderPath = path.join(__dirname, "../../img/small");

const folderPath1 = path.join(__dirname, "../../public/img/landmark/default");
if (!fs.existsSync(folderPath1)) {
  fs.mkdirSync(folderPath1, { recursive: true });
  console.log(`Папка "${folderPath1}" была создана.`);
} else {
  console.log(`Папка "${folderPath1}" уже существует.`);
}

const folderPath2 = path.join(__dirname, "../../public/img/landmark/small");
if (!fs.existsSync(folderPath2)) {
  fs.mkdirSync(folderPath2, { recursive: true });
  console.log(`Папка "${folderPath2}" была создана.`);
} else {
  console.log(`Папка "${folderPath2}" уже существует.`);
}

fs.readdir(defaultFolderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory 1:", err);
    return;
  }

  files.forEach(async (file) => {
    const imgFolder = path.join(defaultFolderPath, file);

    fs.readdir(imgFolder, (err, files) => {
      if (err) {
        console.error("Error reading directory 2:", err);
        return;
      }

      files.forEach((file) => {
        fs.rename(
          path.join(imgFolder, file),
          path.join(imgFolder, "../../../public/img/landmark/default", file),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Файл ${file} перемещен`);
            }
          }
        );
      });
    });
  });
});

fs.readdir(smallFolderPath, (err, files) => {
  console.log(files);
  if (err) {
    console.error("Error reading directory 1:", err);
    return;
  }

  files.forEach(async (file) => {
    const imgFolder = path.join(smallFolderPath, file);

    fs.readdir(imgFolder, (err, files) => {
      if (err) {
        console.error("Error reading directory 2:", err);
        return;
      }

      files.forEach((file) => {
        fs.rename(
          path.join(imgFolder, file),
          path.join(imgFolder, "../../../public/img/landmark/small", file),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Файл ${file} перемещен`);
            }
          }
        );
      });
    });
  });
});

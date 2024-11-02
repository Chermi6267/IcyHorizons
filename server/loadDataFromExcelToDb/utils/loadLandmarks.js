const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

function getPhotos(index) {
  try {
    const directory = path.join(__dirname, `../../img/small/${index}`);

    const files = fs.readdirSync(directory);
    const result = files.map((file) => ({ photoPath: file }));

    return result;
  } catch (err) {
    console.log("Ошибка чтения директории " + err);

    return [];
  }
}

async function loadLandmarks(excelFilePath, reset = true) {
  try {
    if (reset) {
      await prisma.landmarkPhoto.deleteMany().then(async () => {
        await prisma.landmark.deleteMany();
      });
    }

    const workbook = xlsx.readFile(excelFilePath);

    const landmarksSheet = workbook.Sheets["Landmarks"];
    const landmarksData = xlsx.utils.sheet_to_json(landmarksSheet);

    const categoriesSheet = workbook.Sheets["Categories"];
    const categoriesData = xlsx.utils.sheet_to_json(categoriesSheet);

    landmarksData.forEach(async (landmark, index) => {
      const filteredCats = categoriesData.filter(
        (element) => element.landmark_id === index
      );

      const cats = filteredCats.map((element) => {
        return {
          where: { name: element.category_name },
          create: { name: element.category_name },
        };
      });

      const photos = getPhotos(index);

      await prisma.landmark.create({
        data: {
          name: landmark.name,
          longitude: parseFloat(landmark.longitude),
          latitude: parseFloat(landmark.latitude),
          link: landmark.link,
          description: landmark.description,
          rating: 0,
          adminCenterId: landmark.admin_center_id,
          category: {
            connectOrCreate: cats,
          },
          landmarkPhoto: {
            create: photos,
          },
        },
      });
    });

    console.log(
      `Достопримечательности успешно загружены в DB (${landmarksData.length})`
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = loadLandmarks;

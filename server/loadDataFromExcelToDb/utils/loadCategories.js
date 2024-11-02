const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");

async function loadCategories(excelFilePath) {
  try {
    const workbook = xlsx.readFile(excelFilePath);

    const categoriesSheet = workbook.Sheets["CategoriesList"];
    const categoriesData = xlsx.utils.sheet_to_json(categoriesSheet);

    categoriesData.forEach(async (cat) => {
      try {
        await prisma.category.create({
          data: { name: cat.name },
        });
      } catch (error) {}
    });

    console.log(`Категории загружены в DB (${categoriesData.length})`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = loadCategories;

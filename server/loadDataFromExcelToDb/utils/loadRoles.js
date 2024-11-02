const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");

async function loadRoles(excelFilePath) {
  try {
    const workbook = xlsx.readFile(excelFilePath);

    const rolesSheet = workbook.Sheets["Roles"];
    const rolesData = xlsx.utils.sheet_to_json(rolesSheet);

    try {
      await prisma.role.createMany({
        data: rolesData,
      });
    } catch (error) {}

    console.log(`Роли загружены в DB (${rolesData.length})`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = loadRoles;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");

async function loadAdminCenters(excelFilePath) {
  try {
    const workbook = xlsx.readFile(excelFilePath);

    const adminCentersSheet = workbook.Sheets["AdminCenters"];
    const adminCentersData = xlsx.utils.sheet_to_json(adminCentersSheet);

    adminCentersData.forEach(async (adminCenter) => {
      try {
        await prisma.adminCenter.create({
          data: {
            id: adminCenter._id,
            name: adminCenter.name,
            capital: adminCenter.capital,
            area: parseFloat(adminCenter.area),
          },
        });
      } catch (error) {}
    });

    console.log(
      `Административные центры загружены в DB (${adminCentersData.length})`
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = loadAdminCenters;

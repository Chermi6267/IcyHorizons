const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const loadLandmarks = require("./utils/loadLandmarks");
const loadRoles = require("./utils/loadRoles");
const loadTours = require("./utils/loadTours");
const loadCategories = require("./utils/loadCategories");
const loadAdminCenters = require("./utils/loadAdminCenters");
const excelFilePath = "./data.xlsx";

async function loadBasics(excelFilePath) {
  await loadRoles(excelFilePath);
  await loadAdminCenters(excelFilePath);
  await loadCategories(excelFilePath);
}

async function main(excelFilePath) {
  console.log("==================================================");
  await loadBasics(excelFilePath).then(async () => {
    await loadLandmarks(excelFilePath).then(async () => {
      await loadTours(excelFilePath);
      console.log("==================================================");
    });
  });
}

main(excelFilePath)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

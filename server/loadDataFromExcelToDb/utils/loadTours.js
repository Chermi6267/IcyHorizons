const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");

async function loadTours(excelFilePath) {
  try {
    await prisma.tour.deleteMany();

    const workbook = xlsx.readFile(excelFilePath);

    const toursSheet = workbook.Sheets["Tours"];
    const toursData = xlsx.utils.sheet_to_json(toursSheet);

    const markersSheet = workbook.Sheets["Markers"];
    const markersData = xlsx.utils.sheet_to_json(markersSheet);

    for (const tour of toursData) {
      const filteredMarkers = markersData.filter(
        (element) => element.tour_id === tour.id
      );

      const landmarkIds = await Promise.all(
        filteredMarkers.map(async (marker) => {
          const landmark = await prisma.landmark.findUnique({
            where: { name: marker.landmark_name },
          });
          return { id: landmark.id };
        })
      );

      const tourData = {
        title: tour.title,
        description: tour.description,
        landmark: {
          connect: landmarkIds,
        },
      };

      await prisma.tour.create({
        data: tourData,
      });
    }

    console.log(`Туры успешно загружены в DB (${toursData.length})`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = loadTours;

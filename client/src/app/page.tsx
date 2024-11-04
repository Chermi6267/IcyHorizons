import Home from "./home";

export default async function Page() {
  const landmarksResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/landmark/ALL/cat?cats=1,2,3,4/`,
    { next: { revalidate: 60 * 30, tags: ["landmarks"] } }
  );

  const adminCenterResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/landmark/center/ALL`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/cat/all`,
    { next: { revalidate: 60 * 60 * 24 * 30 } }
  );

  const landmarksData = await landmarksResponse.json();
  const adminCenterData = await adminCenterResponse.json();
  const categories = await categoriesResponse.json();

  return (
    <Home
      landmarks={landmarksData.landmarks}
      adminCenter={adminCenterData.adminCenter}
      categories={categories}
    />
  );
}

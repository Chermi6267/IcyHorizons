import { ILandmark } from "@/interfaces/landmark";

export function sortByRating(
  landmarks: ILandmark[],
  order: "asc" | "desc"
): ILandmark[] {
  return [...landmarks].sort((a, b) => {
    const ratingA = parseFloat(a.rating);
    const ratingB = parseFloat(b.rating);

    if (order === "asc") {
      return ratingA - ratingB;
    } else {
      return ratingB - ratingA;
    }
  });
}

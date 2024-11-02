import { ILandmark } from "@/interfaces/landmark";

export function sortLandmarksByCategoryId(
  landmarks: ILandmark[],
  categoryIds: string[]
): ILandmark[] {
  return landmarks.filter((landmark) =>
    landmark.category.some((cat) => categoryIds.includes(cat.id))
  );
}

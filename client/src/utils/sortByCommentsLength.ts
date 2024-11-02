import { ILandmark } from "@/interfaces/landmark";

export function sortByCommentsLength(
  landmarks: ILandmark[],
  order: "asc" | "desc"
): ILandmark[] {
  return [...landmarks].sort((a, b) => {
    const commentsA = a.comment.length;
    const commentsB = b.comment.length;

    if (order === "asc") {
      return commentsA - commentsB;
    } else {
      return commentsB - commentsA;
    }
  });
}

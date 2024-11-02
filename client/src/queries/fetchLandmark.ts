import api from "@/http/api";
import { ILandmark } from "@/interfaces/landmark";

export const fetchLandmark = async (landmarkId: string) => {
  const result = await api.get(`/landmark/id/${landmarkId}`);

  return result.data as ILandmark;
};

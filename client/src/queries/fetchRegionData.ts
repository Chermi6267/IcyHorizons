import api from "@/http/api";
import { ILandmarksByAdminCenter } from "@/interfaces/landmark";

export const fetchRegionData = async (regionId: string, cats: string) => {
  const result = await api.get(`/landmark/${regionId}/cat?cats=${cats}`);

  return result.data as ILandmarksByAdminCenter;
};

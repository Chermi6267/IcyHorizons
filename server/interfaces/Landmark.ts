import { Decimal } from "@prisma/client/runtime/library";

export interface ILandmark {
  name: string;
  latitude: Decimal | number;
  longitude: Decimal | number;
  link: string;
  description: string;
  rating?: Decimal | number;
  adminCenterId: string;
  catId: number[];
  landmarkPhotos?: { photoPath: string }[];
}

export interface IUpdateLandmark {
  id: number;
  name?: string;
  latitude?: Decimal | number;
  longitude?: Decimal | number;
  link?: string;
  description?: string;
  rating?: Decimal | number;
  adminCenterId?: string;
  catId?: number[];
  landmarkPhotos?: { photoPath: string }[];
}

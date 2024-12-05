export interface ICategory {
  id: string;
  name: string;
}

export interface ILandmarkPhoto {
  id: number;
  photoPath: string;
  landmarkId: number;
}

export interface IAdminCenter {
  id: string;
  name: string;
  capital: string;
  area: string;
}

export interface ILandmarksByAdminCenter {
  landmarks: ILandmark[];
  adminCenter: IAdminCenter;
}

interface IComment {
  id: number;
  text: string;
  stars: string;
  createdAt: string;
  updatedAt: string;
  user: { email: string; profile: { avatar: string; name: string } };
  landmarkId: number;
}

export interface ILandmark {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  link: string;
  description: string;
  rating: string;
  category: ICategory[];
  landmarkPhoto: ILandmarkPhoto[];
  comment: IComment[];
  adminCenter?: IAdminCenter;
}

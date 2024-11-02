import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILandmark } from "@/interfaces/landmark";

const initialState: ILandmark[] = [
  {
    id: 366,
    name: "Сэргэ",
    latitude: "62.091721",
    longitude: "131.418869",
    link: "https://yandex.ru/maps/-/CDCx7V-c",
    description:
      "Сэргэ — ритуальный столб, коновязь. Изначально сэргэ ставились у жилья (юрты, балагана) якутов и использовались по их прямому назначению — для привязывания коня. Сэргэ означало, что у земли есть хозяин. В первую очередь сэргэ связано с культом коня.\r\n\r\nСэргэ для нас — это символ счастья и благополучия. Сэргэ устанавливали и устанавливают во время национального праздника «Ысыах», юбилеев, праздников и значимых мероприятий.",
    rating: "0",
    category: [
      {
        id: "2",
        name: "Исторические и культурные достопримечательности",
      },
    ],
    landmarkPhoto: [
      {
        id: 1582,
        photoPath: "248e15e9-d07c-450a-8239-2a68ae3af0f3.jpg",
        landmarkId: 366,
      },
      {
        id: 1583,
        photoPath: "46b00bb0-7a31-4498-8bdf-88069bde16f1.jpg",
        landmarkId: 366,
      },
      {
        id: 1584,
        photoPath: "50a22f89-e4b3-450f-bdaa-8463e647a28d.jpg",
        landmarkId: 366,
      },
      {
        id: 1585,
        photoPath: "a6964dd4-5c44-4d30-9d94-9494a2b86fbb.jpg",
        landmarkId: 366,
      },
    ],
    comment: [],
  },
];

export const landmarksSlice = createSlice({
  name: "landmarks",
  initialState,
  reducers: {
    setLandmarks: (state, action: PayloadAction<ILandmark[]>) => {
      return action.payload;
    },
  },
});

export const { setLandmarks } = landmarksSlice.actions;

export default landmarksSlice.reducer;

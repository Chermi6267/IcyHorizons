export const ratingHandler = (
  rating: number[],
  setRating: React.Dispatch<React.SetStateAction<number[]>>,
  id: number
) => {
  const newRating = rating.map((r, index) => (index < id ? 1 : 0));
  setRating(newRating);
};

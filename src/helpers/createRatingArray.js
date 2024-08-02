//! Veritabanından yorumları çekerken aldığı sayısal rating değerini 
//! anlamsal bir diziye çeviriyoz.
//! Örn : 5 rating => [1,1,1,1,1] ya da 
//! 3 rating => [1,1,1,0,0]

export const createRatingArray = (rating) => {
  const ratingArr = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) if (i < rating) ratingArr[i] = 1;

  return ratingArr;
};

//! Veritabanına yorum ekleyeceğimiz zaman 
//! [1,1,1,0,0] tarzı anlamsal rating dizilerini 
//! 3 , 4 gibi sayısal değerlere çevirmek için
//! Dizide son 1 in olduğu index yeri bulur bunun
//! 1 fazlası rating değeridir.  

export const findIndex = (arr) => {
  let lastIndex = -1;
  for (let i = 0; i < arr.length; i++) if (arr[i] === 1) lastIndex = i;

  return lastIndex;
};

export type Item = {
  id: number;
  stockId: number;
  img: string;
  title: string;
  qt: number;
  price: number;
};

export type stockImage = {
  full: string;
  thumbnail: string;
};

export type stockItem = {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discount: number;
  images: stockImage[];
};

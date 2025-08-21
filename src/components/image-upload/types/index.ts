export type CroppedAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageItem = {
  id: string;
  imageCrop: string | null;
  imageOrigine: string | null;
  croppedAreaPixels: CroppedAreaPixels | null;
};

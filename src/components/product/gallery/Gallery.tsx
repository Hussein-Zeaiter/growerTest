import type { stockItem, stockImage } from "../../../types/item";
import { useState } from "react";

import style from "./Gallery.module.css";

function Gallery({ stockItem }: { stockItem: stockItem }) {
  const [images] = useState<stockImage[]>(stockItem.images);
  const [displayedImage, setDisplayedImage] = useState<string>(images[0].full);

  return (
    <div className={style.gallery}>
      <img src={displayedImage} className={style.fullImg} alt="" />
      <div className={style.thumbnails}>
        {images.map((image) => {
          return (
            <div
              className={`${style.thumbWrapper} ${
                image.full === displayedImage ? style.activeThumb : ""
              }`}
              key={image.full}
            >
              <img
                src={image.thumbnail}
                alt=""
                onClick={() => setDisplayedImage(image.full)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;

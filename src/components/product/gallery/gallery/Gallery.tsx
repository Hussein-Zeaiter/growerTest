import type { stockImage } from "../../../../types/item";
import style from "./Gallery.module.css";
import closeButton from "../../../../assets/product/icon-close.svg";
import nextButton from "../../../../assets/product/icon-next.svg";
import prevButton from "../../../../assets/product/icon-previous.svg";
import type { JSX } from "react";

type GalleryType = "gallery" | "lightbox";

interface GalleryProps {
  type: GalleryType;
  images: stockImage[];
  displayedImage: string;
  setDisplayedImage: React.Dispatch<React.SetStateAction<string>>;
  handleOpen?: () => void;
  handleClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

//todo : thumbnails can be their own component ?

function Gallery({
  type,
  images,
  displayedImage,
  setDisplayedImage,
  handleOpen,
  handleClose,
  onPrev,
  onNext,
}: GalleryProps) {
  // displaying big image with a record according to the type, looks complex is easy to understand
  const bigImageByType: Record<GalleryType, JSX.Element> = {
    gallery: (
      <img
        src={displayedImage}
        className={style.fullImg}
        alt=""
        onClick={handleOpen}
      />
    ),

    lightbox: (
      <>
        <div className={style.closeButtonCont}>
          <img src={closeButton} alt="close" onClick={handleClose} />
        </div>

        <div className={style.bigImgWrapper}>
          <button
            className={`${style.arrowButton} ${style.leftArrow}`}
            onClick={onPrev}
          >
            <img src={prevButton} alt="prev" />
          </button>

          <img src={displayedImage} className={style.fullImg} alt="" />

          <button
            className={`${style.arrowButton} ${style.rightArrow}`}
            onClick={onNext}
          >
            <img src={nextButton} alt="next" />
          </button>
        </div>
      </>
    ),
  };

  return (
    // if gallery, render gallery, if lightbox, render lightbox, this either gives small gallery or big lightbox
    <div className={type === "gallery" ? style.gallery : style.lightbox}>
      {/* Big image logic displayed acc */}
      {bigImageByType[type]}

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

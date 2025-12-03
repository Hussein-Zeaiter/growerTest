import Gallery from "./gallery/Gallery";
import { useState } from "react";
import type { stockItem, stockImage } from "../../../types/item";

function ImageDisplayer({ stockItem }: { stockItem: stockItem }) {
  const [images] = useState<stockImage[]>(stockItem.images);
  const [displayedImage, setDisplayedImage] = useState<string>(images[0].full);
  const [lightboxVisible, setLightboxVisible] = useState<boolean>(false);

  // Open the lightbox
  const handleOpen = () => setLightboxVisible(true);

  // Close the lightbox
  const handleClose = () => setLightboxVisible(false);

  // Go to previous image
  const onPrev = () => {
    const currentIndex = images.findIndex((img) => img.full === displayedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setDisplayedImage(images[prevIndex].full);
  };

  // Go to next image
  const onNext = () => {
    const currentIndex = images.findIndex((img) => img.full === displayedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setDisplayedImage(images[nextIndex].full);
  };

  return (
    <>
      <Gallery
        type="gallery"
        images={images}
        displayedImage={displayedImage}
        setDisplayedImage={setDisplayedImage}
        handleOpen={handleOpen}
      />

      {/* Lightbox, only render if visible */}
      {lightboxVisible && (
        <Gallery
          type="lightbox"
          images={images}
          displayedImage={displayedImage}
          setDisplayedImage={setDisplayedImage}
          handleClose={handleClose}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </>
  );
}

export default ImageDisplayer;

import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
export default function Images(img) {
  const [images, setImages] = useState(null);

  useEffect(() => {
   setImages(img);
  }, []);
  const thumbnailTemplate = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "50%", overflow: "hidden", maxHeight: "200px" }}
    />
  );

  const thumbnail = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "100%", overflow: "hidden", maxHeight: "400px" }}
    />
  );
  return (
    <div className="card">
      <Galleria
        value={images}
        numVisible={5}
        style={{ maxWidth: "640px" }}
        item={thumbnail}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}

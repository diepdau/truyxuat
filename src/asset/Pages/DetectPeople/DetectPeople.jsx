import React, { useState } from 'react';
import "./DetectPeople.css";



const CardDetectPeople = ({ images }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  const handleImageClick = (index) => {
    setZoomedIndex(zoomedIndex === index ? null : index); // Phóng to hoặc thu nhỏ
  };

  return (
    <div className="image-grid-container">
      {/* Overlay nền tối */}
      {zoomedIndex !== null && <div className="overlay" onClick={() => setZoomedIndex(null)} />}

      {/* Lưới hình ảnh */}
      <div className="image-grid">
        {images.map((url, index) => (
          <div
            key={index}
            className={`image-container ${zoomedIndex === index ? 'zoomed' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};



export default CardDetectPeople;

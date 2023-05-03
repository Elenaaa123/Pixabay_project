import './imageModal.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="image-details-modal" onClick={(e) => e.stopPropagation()}>
        {image && (
          <div className="image-modal-content">
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="image-modal-image"
            />
            <p>Views: {image.views}</p>
            <p>Downloads: {image.downloads}</p>
            <p>Collections: {image.collections}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;

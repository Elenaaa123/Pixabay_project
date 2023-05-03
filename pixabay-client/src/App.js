import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from './actions';
import { setCategory, setPage } from './store';
import ImageModal from './components/imageModal';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeCategory = (newCategory) => {
    dispatch(setCategory(newCategory));
    dispatch(fetchImages({ category: newCategory, page }));
  };

  const changePage = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchImages({ category, page: newPage }));
  };

  const prevPage = () => {
    if (page > 1) {
      changePage(page - 1);
    }
  };

  const nextPage = () => {
    changePage(page + 1);
  };

  useEffect(() => {
    dispatch(fetchImages({ category, page }));
  }, [dispatch, category, page]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowCategoryModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={prevPage}>Prev</button>
        <button onClick={() => setShowCategoryModal(true)}>
          Select Category
        </button>
        <button onClick={nextPage}>Next</button>
      </header>

      {showCategoryModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Category</h2>
            <select
              value={category}
              onChange={(e) => changeCategory(e.target.value)}
            >
              <option value="sports">Sports</option>
              <option value="animals">Animals</option>
              <option value="food">Food</option>
              <option value="children">Children</option>
              <option value="trip">Trip</option>
            </select>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <main>
        <div className="images-grid">
          {images.slice(0, 9).map((image) => (
            <div
              key={image.id}
              className="image-container"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.webformatURL} alt={image.tags} />
            </div>
          ))}
        </div>
      </main>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={selectedImage}
      />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageGallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleAddImageFromLink = () => {
    const newImage = prompt('Enter image URL:');
    if (newImage) setImages([...images, { type: 'url', url: newImage }]);
  };

  const handleAddImageFromDevice = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, { type: 'file', url: reader.result }]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleBackButton = () => {
    navigate('/AdminDashboard');  // Use navigate instead of history.push
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBackButton} style={styles.backButton}>
        Back to Dashboard
      </button>
      <h1 style={styles.header}>Manage Gallery</h1>
      <div style={styles.addButtonContainer}>
        <button onClick={handleAddImageFromLink} style={styles.addButton}>
          Add Image from URL
        </button>
        <input 
          type="file" 
          onChange={handleAddImageFromDevice} 
          accept="image/*" 
          style={styles.fileInput} 
        />
      </div>
      <div style={styles.galleryContainer}>
        {images.map((image, index) => (
          <div key={index} style={styles.imageContainer}>
            <img
              src={image.type === 'url' ? image.url : image.url}
              alt={`Gallery item ${index}`}
              style={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  backButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '0 10px',
  },
  fileInput: {
    display: 'none',
  },
  galleryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  imageContainer: {
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default ManageGallery;

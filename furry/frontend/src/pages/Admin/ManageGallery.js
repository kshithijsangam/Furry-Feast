import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageGallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Fetch images from the database on component load
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleAddImageFromLink = async () => {
    const newImageURL = prompt('Enter image URL:');
    const title = prompt('Enter image title:');
    if (newImageURL && title) {
      const image = { type: 'url', url: newImageURL, title };
      await saveImageToDB(image);
    }
  };

  const handleAddImageFromDevice = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const title = prompt('Enter image title:');
      if (title) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const image = { type: 'file', url: reader.result, title };
          await saveImageToDB(image);
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert('Please select a valid image file');
    }
  };

  const saveImageToDB = async (image) => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-image', image);
      setImages([...images, { ...image, id: response.data.id }]);
    } catch (error) {
      console.error('Error saving image to database:', error);
    }
  };

  const handleBackButton = () => {
    navigate('/AdminDashboard');
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
        <button
          onClick={() => document.getElementById('fileInput').click()}
          style={styles.addButton}
        >
          Add Image from Device
        </button>
        <input
          id="fileInput"
          type="file"
          onChange={handleAddImageFromDevice}
          accept="image/*"
          style={styles.hiddenFileInput}
        />
      </div>
      <div style={styles.galleryContainer}>
        {images.map((image) => (
          <div key={image.id} style={styles.imageContainer}>
            <img src={image.url} alt={`Gallery item`} style={styles.image} />
            <p>{image.title}</p>
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
  hiddenFileInput: {
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
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default ManageGallery;

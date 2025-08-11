import React from 'react';

const PhotoUpload = ({ photos, onPhotosChange }) => {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real implementation, you'd upload to a server
    // For now, just simulate with file names
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    onPhotosChange([...photos, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    onPhotosChange(photos.filter(p => p.id !== photoId));
  };

  return (
    <div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <div className="text-4xl mb-4">📸</div>
        <p className="text-gray-600 mb-4">Upload facility photos</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-600 inline-block"
        >
          Choose Files
        </label>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative">
              <img 
                src={photo.url} 
                alt={photo.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

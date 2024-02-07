import React, { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/use.user';

const ImageUpload: React.FC = () => {
  const { uploadImage, currentUser } = useUsers();

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    uploadImage(formData, currentUser.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="img">Upload image</label>
      <input
        type="file"
        placeholder="Select image"
        name="img"
        id="img"
        accept="image/png, image/jpeg, image/jpg"
        required
      />
      <button aria-label="send-button" type="submit">
        Upload Image
      </button>
    </form>
  );
};

export default ImageUpload;

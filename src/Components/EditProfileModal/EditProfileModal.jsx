import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';
import axios from 'axios';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); 

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setImage(user.image || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { // me base en https://stackoverflow.com/questions/48817750/load-image-from-url-into-file-input-field
      const reader = new FileReader(); //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); 
      };
    }
  };
  

  
  const confirmarCambio = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('https://dummyjson.com/users/' + user.id, {
        firstName: firstName,
        lastName: lastName,
        image: image,
        email: email
      });

      if (response.status === 200) {
        console.log('Respuesta del servidor:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        onSave(response.data);
        alert("Perfil editado con exito");
        onClose();
      }
    } catch (error) {
      console.error('Error en la autenticación:', error.response?.data || error.message);
      alert('No pude actualizar perfil');
      
      setError('No pude actualizar perfil :('); 
    }
  };

  if (!user) {
    return <p>Error: No se pudo cargar la información del usuario.</p>;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h1>Editar Perfil</h1>
        <img className="profile-img" src={image || user.image}  alt="Perfil" />
        <form onSubmit={confirmarCambio}>
          {error && <p className="error-message">{error}</p>}
          <label> Foto de Perfil:
            <input type="file" onChange={handleFileChange} />
          </label><br />
          <label> Nombre:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label><br />
          <label> Apellido:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label><br />
          <label> Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label><br />
          <button className="save-btn" type="submit">Actualizar</button>
          <button className="cancel-btn" type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

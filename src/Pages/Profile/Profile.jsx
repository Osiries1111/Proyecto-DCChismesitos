import React, { useState, useEffect } from 'react';
import EditProfileModal from '../../Components/EditProfileModal/EditProfileModal'
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [edicion, setEdicion] = useState(false);

  const handleUpdateUser  = async (nuevoUsuario) => {
    console.log(nuevoUsuario);
    setUser(nuevoUsuario);
  };

  return (
    <div className="profile_container">
      <h1 className="titulo_perfil">Mi Perfil</h1>
      <img className="profile-img" src={user.image && user.image instanceof File ? URL.createObjectURL(user.image) : user.image}  alt="Perfil" />
      <h3 className="nombre_user">Nombre: {user.firstName} {user.lastName}</h3>
      <h3 className="mail">Email: {user.email}</h3>
      <h3 className="username">Usuario: {user.username}</h3>
      <button className="botton_edit_profile" onClick={() => setEdicion(true)}>
        Editar Perfil
      </button>

      {edicion && (
        <EditProfileModal user={user} onClose={() => setEdicion(false)} onSave={handleUpdateUser} />
      )}
    </div>
  );
};

export default Profile;

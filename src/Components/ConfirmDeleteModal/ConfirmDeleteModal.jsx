import React from 'react';
import axios from 'axios';
import './ConfirmDeleteModal.css';
const ConfirmDeleteModal = ({ post, onClose, onDelete }) => {
  
  const deletePost = async () => {
      onDelete(post);
      alert("Se eliminó el post");
      onClose();  
  };

  return (
    <div className='conf_delete'>
      <h1 className='text_delete_post'>¿Seguro que quieres eliminar este post?</h1><br />
      <button className='boton_cancelar_delete' onClick={onClose}>Cancelar</button>
      <button className='boton_delete_post' onClick={deletePost}>Eliminar</button>
    </div>
  );
};

export default ConfirmDeleteModal;

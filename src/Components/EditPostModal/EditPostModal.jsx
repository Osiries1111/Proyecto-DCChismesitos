import React, { useState } from 'react';
import axios from 'axios';


const EditPostModal = ({ post, onClose, onUpdate }) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.body);
  const [newTag, setNewTag] = useState(post.tags);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reviso campos no vacíos
    if (!newTitle.trim() || !newContent.trim()) {
      setError('El título y el contenido son obligatorios.');
      alert('El título y el contenido son obligatorios.');
      return;
    }

    //usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!userData || !userData.id) {
      alert('No se encontró información del usuario.');
      return;
    }

    // manejo tags
    let tagsArray;
    if (typeof newTag === 'string' && newTag.trim() !== '') {
      tagsArray = newTag.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    } else {
      tagsArray = [];
    }
    
    const updatedPost = {
      id: post.id,
      userId: userData.id,
      title: newTitle,
      body: newContent,
      tags: tagsArray,
      views: post.views,
      reactions: post.reactions,
    };

    try {
      const response = await axios.put(`https://dummyjson.com/posts/${post.id}`, updatedPost);
      
      if (response.status === 200) {
        console.log('Post editado:', response.data);

        setSuccess('Post actualizado exitosamente.');
        alert("Post editado");
        onUpdate(response.data); 
      }
      
    } catch (error) {
      setError('Hubo un error al actualizar el post. Intenta nuevamente.');
      console.error('Error actualizando el post: por API', error);
      alert("Post editado");
      onUpdate(updatedPost);
      
    }

    onClose(); 
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Editar Post</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
          />
          
          <label>Contenido:</label>
          <textarea 
            value={newContent} 
            onChange={(e) => setNewContent(e.target.value)} 
          />
          
          <label>Etiquetas: (separadas por comas)</label>
          <input 
            type="text" 
            value={newTag} 
            onChange={(e) => setNewTag(e.target.value)} 
          />

          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;

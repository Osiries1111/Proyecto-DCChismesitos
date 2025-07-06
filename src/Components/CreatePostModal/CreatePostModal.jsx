import React, { useState } from 'react';
import axios from 'axios';
import './CreatePostModal.css';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [etiquetas, setEtiquetas] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reviso que título y contenido no estén vacíos
    if (!titulo.trim() || !contenido.trim()) {
      setMensaje('El título y el contenido no pueden estar vacíos.');
      alert('El título y el contenido no pueden estar vacíos.');
      setTipoMensaje('error');
      return;
    }

    // usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    let id_post = parseInt(localStorage.getItem('id_posts'), 10);
    id_post += 1;

    // que este loggiado
    if (!userData || !userData.id) {
      setMensaje('No se encontró información del usuario.');
      setTipoMensaje('error');
      return;
    }

    //manejo tags
    let tagsArray;
    if(etiquetas.trim() != ''){
      tagsArray = etiquetas.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    } else{
      tagsArray = [];
    }
    

    try {
      let id_post = parseInt(localStorage.getItem('id_posts'), 10);
      const response = await axios.post('https://dummyjson.com/posts/add', {
        id: id_post,
        userId: userData.id,
        title: titulo.trim(),
        body: contenido.trim(),
        tags: tagsArray,
        reactions: {likes: 0, dislikes: 0},
        views: 0,
      });

      // uso los mismos datos del response y le coloco un id único
      const postreemplazo = {
        id: id_post,
        userId: response.data.userId,
        title: response.data.title,
        body: response.data.body,
        tags: response.data.tags,
        views: 0,
        reactions: response.data.reactions,
      };

      console.log('Post creado:', response.data);
      // guardo post con id unico
      onPostCreated(postreemplazo);

      setMensaje('Post creado con éxito.');
      setTipoMensaje('success');
      alert('Post creado con éxito.');
      onClose();

    } catch (error) {
      console.error('Error al crear el post:', error);
      setMensaje('Hubo un error al crear el post.');
      alert("Hubo un error al crear el post, intente de nuevo");
      setTipoMensaje('error');
    }
  };

  return (
    <div className='popup'>
      <div className='new_postal'>
        <h1 className='crear_new_post'>Crear Nuevo Post</h1>
        <form className="form_new_post" onSubmit={handleSubmit}>
          <h2 className='titulo_new_post'>Título</h2>
          <input 
            type="text" 
            placeholder="¿Qué quieres compartir?" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
          />

          <h2 className='contenido_new_post'>Contenido</h2>
          <textarea 
            placeholder="Escribe tu post aquí..." 
            value={contenido} 
            onChange={(e) => setContenido(e.target.value)}
          />

          <h2 className='etiquetas_new_post'>Etiquetas (separadas por comas)</h2>
          <input 
            type="text" 
            placeholder="ejemplo, etiqueta, post" 
            value={etiquetas} 
            onChange={(e) => setEtiquetas(e.target.value)}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
        
      </div>
    </div>
  );
};

export default CreatePostModal;

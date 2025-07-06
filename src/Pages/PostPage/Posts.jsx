import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePostModal from '../../Components/CreatePostModal/CreatePostModal';
import InfoCard from '../../Components/InfoCard/InfoCard';
import './Posts.css';

const PostPage = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id || null;
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]); 
  const [showCreate, setShowCreate] = useState(false);
  const [page, setPage] = useState(1);
  const elementsPerPage = 10;

  useEffect(() => {
    
    getPosts();
  }, []);

  const getPosts = async (e) => {
    
    try {
      const response = await axios.get('https://dummyjson.com/posts?limit=0');
      
      //Saco cantidad de posts totales, y llevo un conteo de IDs para colocarle a cada nuevo post
      // su propio ID único para no tener problemas en eliminar y editar
      if (response.status === 200) {
        console.log('Respuesta del servidor:', response.data);
        setPosts(response.data.posts); 
        localStorage.setItem('posts', posts);
        localStorage.setItem('N_posts', parseInt(response.data.total, 10));
        localStorage.setItem('id_posts', parseInt(response.data.total, 10));
        let id_post = parseInt(localStorage.getItem('id_posts'), 10) + 1;
        localStorage.setItem('id_posts', id_post);
      }
    } catch (error) {
      console.error('Error obteniendo los posts:', error.response?.data || error.message);
      setError('No pude obtener los posts');
    }
  };

  // paginacion con inspiracion en https://programadorwebvalencia.com/javascript-crear-paginador/
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(posts.length / elementsPerPage)) return;
    setPage(newPage);
  };
  const paginatedPosts = posts.slice((page - 1) * elementsPerPage, page * elementsPerPage);

  
  const handlePostCreated = (newPost) => {
    
    console.log('creo nuevo post: ',newPost);
    setPosts([newPost, ...posts]); // yo no sabía que podía hacer esto ajajajaj https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    setShowCreate(false); 
    localStorage.setItem('posts', posts);
    let cant_posts = parseInt(localStorage.getItem('N_posts'), 10);
    cant_posts += 1;
    localStorage.setItem('N_posts', cant_posts);
    let id_post = parseInt(localStorage.getItem('id_posts'), 10);
    id_post += 1;
    console.log("Siguiente ID: ",id_post);
    localStorage.setItem('id_posts', id_post);
    
  };
  
  const handleUpdatePost = (updatedPost) => {
    console.log(updatedPost);
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))); 
    localStorage.setItem('posts', posts);
  };
  
  const handleDeletePost = (postToDelete) => {
    setPosts(posts.filter((post) => post.id !== postToDelete.id));
    localStorage.setItem('posts', posts);
    let cant_posts = localStorage.getItem('N_posts');
    cant_posts -= 1;
    localStorage.setItem('N_posts', cant_posts);
  };

  return (
    <div className='container-posts'>
      <div className='container-create-posts'>
        <button onClick={() => setShowCreate(true)}>+</button>
        <p>¿Qué quieres compartir?</p>
      </div>

      {showCreate && (
        <CreatePostModal 
          isOpen={() => setShowCreate(false)} 
          onClose={() => setShowCreate(false)} 
          onPostCreated={handlePostCreated} 
        />
      )}

      <div className='posts'>
        {paginatedPosts.map((item) => (
          <InfoCard
            key={item.id} 
            post={{
              id: item.id,
              title: item.title,
              body: item.body,
              reactions: item.reactions,
              userId: item.userId,
              tags: item.tags,
              views: item.views,
            }} 
            currentUserId={currentUserId} 
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ))}
      </div>

      <div className='paginacion'>
        <button onClick={() => handlePageChange(page - 1)}>👈</button>
        <span>Página {page} de {Math.ceil(posts.length / elementsPerPage)}</span>
        <button onClick={() => handlePageChange(page + 1)}>👉</button>
      </div>
    </div>
  );
};

export default PostPage;

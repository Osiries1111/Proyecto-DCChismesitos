import React, { useState, useEffect } from 'react';
import PostInfoModal from '../../Components/PostInfoModal/PostInfoModal';
import axios from 'axios';
import './InfoCard.css';

const InfoCard = ({ post, currentUserId, onUpdatePost, onDeletePost }) => {
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://placehold.co/150"); // Imagen por defecto
  const [userName, setUserName] = useState("Usuario Desconocido");

 
  useEffect(() => {
    const getUserInfo = async () => {
      if (!post.userId) return;
      const usuario = JSON.parse(localStorage.getItem('user'));
      if (post.userId == usuario.id){
        setProfileImage(usuario.image);
        setUserName(`${usuario.firstName} ${usuario.lastName}`);
      } else {
        try {
          const response = await axios.get(`https://dummyjson.com/users/${post.userId}`);
          if (response.status === 200) {
            setProfileImage(response.data.image || "https://placehold.co/150");
            setUserName(`${response.data.firstName} ${response.data.lastName}`);
          }
        } catch (error) {
          console.error("Error obteniendo el usuario:", error);
        }
      }
    };

    getUserInfo();
  }, [post.userId]);

  return (
    <div className="infocard">
      <div className="imagen_usuario">
        <h3>{userName}</h3>
        <img src={profileImage} alt="User profile" />
      </div>

      <div className="titulo_contenido">
        <h1>{post.title || "Título no disponible"}</h1>
        <p className="details">
          {post.body ? post.body.substring(0, 150) + "..." : "Contenido no disponible"}
        </p>
        
        <button className="read-more-button" onClick={() => setShowModal(true)}>
          Ver más
        </button>
        <div className='lista_tags'>
          <p className='tags'>Tags: {post.tags!="" ? `#${post.tags.join(" #")}` : "No hay tags"}</p>
        </div>
        <div className='reactions_likes_views'>
            <p className='extras'>👍{post.reactions.likes} 👎{post.reactions.dislikes} 👀{post.views}</p>
        </div>
      </div>

      {showModal && (
        <PostInfoModal 
          post={post} 
          onClose={() => setShowModal(false)} 
          onUpdatePost={onUpdatePost} 
          onDeletePost={onDeletePost}
          user={{name_user: userName,
             imagen:profileImage}} 
        />
      )}
    </div>
  );
};

export default InfoCard;

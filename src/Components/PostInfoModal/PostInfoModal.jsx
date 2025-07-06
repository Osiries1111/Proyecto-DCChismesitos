import React, { useState, useEffect } from 'react';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import EditPostModal from '../../Components/EditPostModal/EditPostModal';

const PostInfoModal = ({ post, onClose, user, onUpdatePost, onDeletePost }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modif, setModif] = useState(false);
  const [printPost, setPrintPost] = useState(post);

  const verif_user_modf = (post_user) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = currentUser?.id || null;
    if (currentUserId == post_user.userId){
      setModif(true);
    }
  }

  useEffect(() => {
    verif_user_modf(post);
  }, [modif]);

  const handleEditPost = (posteo) => {
    setPrintPost(posteo);
    
    console.log(posteo);
    onUpdatePost(posteo);
  };

  const handleEdit = () => {
    if (modif == true){
      setIsEditModalOpen(true);
    }
    
  };

  const handleDelete = () => {
    if(modif == true){
      setIsDeleteModalOpen(true);
    } 
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    onClose();
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="imagen_usuario">
        <h3>{user.name_user}</h3>
        <img src={user.imagen} alt="User profile" />
      </div>
        <h1>{printPost.title}</h1>
        <p>{printPost.body}</p>
        <div className='extras'>
        <div className='lista_tags'>
          <p>Tags: {post.tags!="" ? `#${post.tags.join(" #")}` : "No hay tags"}</p> <br />
        </div>
        <div className='reactions_likes_views'>
            <p>👍{post.reactions.likes} 👎{post.reactions.dislikes} 👀{post.views}</p>
        </div>
        </div>
        {modif && (<button className="edit-btn" onClick={handleEdit}>Editar</button>)}
        {modif && (<button className="delete-btn" onClick={handleDelete}>Eliminar</button>)}
      </div>

      {isEditModalOpen && (
        <EditPostModal post={printPost} onClose={handleCloseEdit} onUpdate={handleEditPost} />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal post={printPost} onClose={handleCloseDelete} onDelete={onDeletePost} />
      )}
    </div>
  );
};

export default PostInfoModal;

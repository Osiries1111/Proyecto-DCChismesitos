import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
  <div className="nombre-rrss">
    <div className="imagen_rrrss">
      <img src="src/Components/Navbar/pngtree-crying-cat-meme-sticker-tshirt-illustration-png-image_12494171.avif" alt="fotoperfil" />
    </div>
    <h1 className="name-twitter">DCChismesitos.com</h1>
  </div> 
  <div className="boton-rrss">
    {token ? (
      <>
        <button className="nav_button" onClick={() => navigate('/posts')}>Post</button>
        <button className="nav_button" onClick={() => navigate('/perfil')}>Profile</button>
        <button className="logout_button" onClick={handleLogout}>Cerrar Sesión</button>
      </>
    ) : (
      <button className="login_button" onClick={() => navigate('/login')}>Iniciar Sesión</button>
    )}
  </div>
</nav>

  );
};

export default Navbar;

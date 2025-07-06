import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password
      });
      
      console.log('Respuesta del servidor:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      navigate('/posts');

    } catch (error) {
      console.error('Error en la autenticación:', error.response?.data || error.message);
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
    
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login'>
      <div className='contenedor_login'>
      <h1 className='titulo_inicio_sesion'>Inicio de Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="formulario_login" onSubmit={handleLogin}>
        <input className='nombre_usuario'
          type="text" 
          placeholder="nombre_usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <br />
        <input className='password_usuario'
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button className='boton_submit_login' type="submit">Entrar</button>
      </form>
    </div>
    </div>
    
  );
};

export default Login;

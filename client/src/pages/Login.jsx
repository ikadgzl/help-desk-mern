import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error('Provide all the credentials.');
      return;
    }

    dispatch(login(credentials));
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to get support.</p>
      </section>

      <section className='form'>
        <form className='form-group' onSubmit={handleSubmit}>
          <input
            required
            className='form-control'
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={credentials.email}
            onChange={handleCredentials}
          />

          <input
            required
            className='form-control'
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={credentials.password}
            onChange={handleCredentials}
          />

          <button className='btn btn-block' type='submit'>
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;

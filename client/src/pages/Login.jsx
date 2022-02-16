import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    dispatch(reset());

    if (auth.error) {
      toast.error(auth.message);
    }

    if ((auth.success, auth.user)) {
      toast.success('Successfully signed in, redirecting in two seconds..');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [auth, navigate, dispatch]);

  if (auth.isLoading) {
    return <Spinner />;
  }

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

import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account.</p>
      </section>

      <section className='form'>
        <form className='form-group' onSubmit={handleSubmit}>
          <input
            required
            className='form-control'
            type='text'
            name='name'
            placeholder='Enter your name...'
            value={credentials.name}
            onChange={handleCredentials}
          />

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

          <input
            required
            className='form-control'
            type='password'
            name='confirmPassword'
            placeholder='Confirm your email...'
            value={credentials.confirmPassword}
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

export default Register;

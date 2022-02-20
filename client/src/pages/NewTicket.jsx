import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);

  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
    product: 'iPhone',
    description: ''
  });

  const handleTicket = (e) => {
    setInfo((prevInfo) => ({ ...prevInfo, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(info);
  };

  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <form className='form-group' onSubmit={handleSubmit}>
          <label>
            Customer Name
            <input
              type='text'
              id='name'
              name='name'
              className='form-control'
              value={info.name}
              disabled
            />
          </label>

          <label>
            Customer Email
            <input
              type='text'
              name='email'
              className='form-control'
              value={info.email}
              disabled
            />
          </label>

          <label>
            Product
            <select
              type='text'
              name='product'
              className='form-control'
              value={info.product}
              onChange={handleTicket}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook'>Macbook</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </label>

          <label>
            Description of the issue
            <textarea
              name='description'
              placeholder='Description... '
              className='form-control'
              value={info.description}
              onChange={handleTicket}
            />
          </label>

          <button className='btn btn-block'>Submit</button>
        </form>
      </section>
    </>
  );
};

export default NewTicket;

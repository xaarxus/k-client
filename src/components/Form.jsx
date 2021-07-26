import { useState } from 'react';
import axios from 'axios';

const Form = ({ setBikes }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [mes, setMes] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(name, type, color, size, price, id, description);
      const res = await axios({
        method: 'post',
        url: 'https://keenethicsserver.herokuapp.com/bike/addBike',
        data: { name, type, color, size, price, id, description }
      });
      const { bike, message } = res.data;
      if (message) {
        setMes(message);
        setTimeout(() => setMes(''), 4000);
      }
      if (bike) {
        await axios({
          method: 'get',
          url: 'https://keenethicsserver.herokuapp.com/bike/bikes'
        }).then(res => setBikes(res.data));
        handleClear();
      }
  };

  const handleClear = () => {
    setName('');
    setType('');
    setColor('');
    setSize('');
    setPrice('');
    setId('');
    setDescription('');
};

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required='required' pattern='([a-z]|[A-Z]){5,30}' title='5 to 30 letters' />
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder='Type' required='required' pattern='([a-z]|[A-Z]){5,30}' title='5 to 30 letters' />
      <br />
      <input value={color} onChange={(e) => setColor(e.target.value)} placeholder='Color' required='required' pattern='([a-z]|[A-Z]){3,15}' title='3 to 15 letters' />
      <input value={size} onChange={(e) => setSize(e.target.value)} placeholder='Wheel size' required='required' pattern='[0-9]+' title='only a number' />
      <br />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' required='required' pattern='[0-9]+' title='only a number' />
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder='ID (slug): XXXXXXXXXXXXX' required='required' pattern='([a-z]|[A-Z]|[0-9]){13,20}' title='13 to 20 characters' />
      <br />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
      <button className='button-form' type='submit'>SAVE</button>
      <button onClick={handleClear} className='button-form'>CLEAR</button>
      <p className='message-from-api'>{mes}</p>
    </form>
  );
};

export default Form;
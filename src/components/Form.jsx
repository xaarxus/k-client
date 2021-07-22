import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [descroption, setDescroption] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(name, type, color, size, price, id, descroption);
      handleClear();
  };

  const handleClear = () => {
    setName('');
    setType('');
    setColor('');
    setSize('');
    setPrice('');
    setId('');
    setDescroption('');
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
      <textarea value={descroption} onChange={(e) => setDescroption(e.target.value)} placeholder='Description' />
      <button className='button-form' type='submit'>SAVE</button>
      <button onClick={handleClear} className='button-form'>CLEAR</button>
    </form>
  );
};

export default Form;
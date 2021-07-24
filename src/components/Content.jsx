import { useState, useEffect } from 'react';
import '../styles/content.css';
import Form from './Form';
import axios from 'axios';

const BikeItem = ({ bike: {
  id,
  name,
  type,
  color,
  status,
  size,
  price,
  description
  }, setBikes }) => {
  const deleteItem = (id) => async () => {
    await axios({
      method: 'delete',
      url: 'https://keenethicsserver.herokuapp.com//bike/deleteBike',
      data: { id }
    });
    await axios({
      method: 'get',
      url: 'https://keenethicsserver.herokuapp.com//bike/bikes'
    }).then(res => setBikes(res.data));
  };

  const changeStatus = (id) => async (e) => {
    await axios({
      method: 'patch',
      url: 'https://keenethicsserver.herokuapp.com//bike/updateBike',
      data: { id, status: e.target.value }
    });
    await axios({
      method: 'get',
      url: 'https://keenethicsserver.herokuapp.com//bike/bikes'
    }).then(res => setBikes(res.data));
  };

  return (
    <div className={`bike-item ${status}`}>
      <p className='title'><span><span className='text-bold'>{name}</span> - {type} ({color})</span><span onClick={deleteItem(id)} className='close'>&#10006;</span></p>
      <p className='text-id'>ID: {id}</p>
      <p className='status'>
        <span>
          STATUS:
          <select onChange={changeStatus(id)} value={status} className='select-status'>
            <option value='Available'>Available</option>
            <option value='Busy'>Busy</option>
            <option value='Unavailable'>Unavailable</option>
          </select>
        </span>
        <span className={`s-24 ${status === 'Unavailable' ? 'opacity-half': ''}`}>{price} UAH/hr.</span>
      </p>
    </div>
  );
};

const Content = () => {
  const [bikes, setBikes] = useState([]);
  const [availables, setAvailables] = useState(0);
  const [busy, setBusy] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setAvailables((bikes.filter(b => b.status === 'Available')).length);

    setBusy((bikes.filter(b => b.status === 'Busy' || b.status === 'Unavailable')).length);

    const p = bikes.filter(b => b.status === 'Available')
      .reduce((acc, b) => acc + b.price, 0);

    setPrice(Math.round((p / availables) * 100) / 100);
  }, [bikes, availables, busy])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://keenethicsserver.herokuapp.com//bike/bikes'
    }).then(res => setBikes(res.data));
  }, []);

  return (
    <div className='content'>
      <div className='items'>
        {bikes.map(bike => <BikeItem key={bike.id} bike={bike} setBikes={setBikes} />)}
      </div>
      <div className='form'>
        <Form setBikes={setBikes} />
        <hr />
        <div className='statistics'>
          <p className='s-18'>STATISTICS</p>
          <p>Total Bikes: <span>{(availables + busy)}</span></p>
          <p>Available Bikes: <span>{availables}</span></p>
          <p>Booked Bikes: <span>{busy}</span></p>
          <p>Avarage Bike Cost: <span>{price}</span> UAH/hr.</p>
        </div>
      </div>
    </div>
  )
};

export default Content;
import { useState, useEffect } from 'react';
import '../styles/content.css';
import Form from './Form';

const Content = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {

  });

  return (
    <div className='content'>
      <div className='items'>
        bikes
      </div>
      <div className='form'>
        <Form />
        <hr />
        <div className='statistics'>
          <p className='s-18'>STATISTICS</p>
          <p>Total Bikes: <span>0</span></p>
          <p>Available Bikes: <span>0</span></p>
          <p>Booked Bikes: <span>0</span></p>
          <p>Avarage Bike Cost: <span>0.00</span> UAH/hr.</p>
        </div>
      </div>
    </div>
  )
};

export default Content;
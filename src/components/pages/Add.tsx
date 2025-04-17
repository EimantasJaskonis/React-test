import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import UsersContext  from '../contexts/UsersContext';
import { CardType } from '../../types';
import styled from 'styled-components';

const AddCar = () => {
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState('');
  const [engine, setEngine] = useState(['', '', '']);
  const [pic, setPic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCar: CardType = {
      id: Date.now().toString(),
      creatorId: loggedInUser?.id || '',
      creatorName: loggedInUser?.name || '',
      creatorAvatar: loggedInUser?.avatar || '',
      createdAt: new Date().toISOString(),
      brand,
      name,
      yearOfManufacture,
      engine,
      pic,
    //   description: `${engine[0]} ${engine[1]} ${engine[2]}`,
    };

    navigate('/home');
  };

  return (
    <AddWrapper>
      <h2>Add New Car</h2>
      <AddCarForm onSubmit={handleSubmit}>
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          type="number"
          placeholder="Year of Manufacture"
          value={yearOfManufacture}
          onChange={(e) => setYearOfManufacture(e.target.value)}
        />
        <input
          type="text"
          placeholder="Engine Part 1"
          value={engine[0]}
          onChange={(e) => setEngine([e.target.value, engine[1], engine[2]])}
        />
        <input
          type="text"
          placeholder="Engine Part 2"
          value={engine[1]}
          onChange={(e) => setEngine([engine[0], e.target.value, engine[2]])}
        />
        <input
          type="text"
          placeholder="Engine Part 3"
          value={engine[2]}
          onChange={(e) => setEngine([engine[0], engine[1], e.target.value])}
        />
        <input type="text" placeholder="Picture URL" value={pic} onChange={(e) => setPic(e.target.value)} />
        <button type="submit">Add Car</button>
      </AddCarForm>
    </AddWrapper>
  );
};

export default AddCar;

const AddWrapper = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

const AddCarForm = styled.form`
  display: flex;
  flex-direction: column;
`;

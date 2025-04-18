import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';
import UsersContext from '../contexts/UsersContext';
import { CardType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const Add = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error('Add must be used within a UsersProvider');

  const { loggedInUser } = context;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    yearOfManufacture: '',
    engine: '',
    power: '',
    torgue: '',
    pic: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInUser) return;

    const newCard: CardType = {
      id: uuidv4(),
      creatorId: loggedInUser.id,
      creatorName: loggedInUser.name,
      creatorAvatar: loggedInUser.avatar || '',
      createdAt: new Date().toISOString(),
      brand: formData.brand,
      name: formData.name,
      yearOfManufacture: formData.yearOfManufacture,
      engine: [formData.engine, formData.power, formData.torgue],
      pic: formData.pic || undefined,
    };

    try {
      const res = await fetch('http://localhost:8080/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });

      if (!res.ok) throw new Error('Failed to add car');
      navigate('/');
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  if (!loggedInUser) {
    return (
      <>
        <Header />
        <Main>
          <p>You must be logged in to add a car.</p>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <FormWrapper onSubmit={handleSubmit}>
        <h2>Add New Car</h2>
        <Input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="yearOfManufacture"
          placeholder="Year of Manufacture"
          value={formData.yearOfManufacture}
          onChange={handleChange}
          required
        />
        <Input
          name="engine"
          placeholder="Engine Type"
          value={formData.engine}
          onChange={handleChange}
          required
        />
        <Input
          name="power"
          placeholder="Power"
          value={formData.power}
          onChange={handleChange}
          required
        />
        <Input
          name="torgue"
          placeholder="Torgue"
          value={formData.torgue}
          onChange={handleChange}
          required
        />
        <Input
          name="pic"
          placeholder="Image URL (optional)"
          value={formData.pic}
          onChange={handleChange}
        />
        <SubmitButton type="submit">Add Car</SubmitButton>
      </FormWrapper>
      <Footer />
    </>
  );
};

export default Add;

const Main = styled.main`
  padding: 20px;
`;

const FormWrapper = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: rgb(250, 70, 70);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

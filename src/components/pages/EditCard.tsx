import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';
import UsersContext from '../contexts/UsersContext';
import { CardType } from '../../types';

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(UsersContext);
  if (!context) throw new Error('UsersContext must be used within a Provider');

  const { loggedInUser } = context;

  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    yearOfManufacture: '',
    engine: '',
    power: '',
    torgue: '',
    pic: '',
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`http://localhost:8080/cars/${id}`);
        if (!res.ok) throw new Error('Failed to fetch card data');
        const data: CardType = await res.json();

        if (data.creatorId !== loggedInUser?.id) {
          navigate('/');
          return;
        }

        setFormData({
          brand: data.brand,
          name: data.name,
          yearOfManufacture: data.yearOfManufacture,
          engine: data.engine[0] || '',
          power: data.engine[1] || '',
          torgue: data.engine[2] || '',
          pic: data.pic || '',
        });
      } catch (err) {
        console.error('Error loading card:', err);
        navigate('/');
      }
    };

    fetchCard();
  }, [id, loggedInUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCard: CardType = {
      id: id!,
      creatorId: loggedInUser!.id,
      creatorName: loggedInUser!.name,
      creatorAvatar: loggedInUser!.avatar || '',
      createdAt: new Date().toISOString(),
      brand: formData.brand,
      name: formData.name,
      yearOfManufacture: formData.yearOfManufacture,
      engine: [formData.engine, formData.power, formData.torgue],
      pic: formData.pic || undefined,
    };

    try {
      const res = await fetch(`http://localhost:8080/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard),
      });

      if (!res.ok) throw new Error('Failed to update car');
      navigate('/');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <>
      <Header />
      <FormWrapper onSubmit={handleSubmit}>
        <h2>Edit Car</h2>
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
        <SubmitButton type="submit">Save Changes</SubmitButton>
      </FormWrapper>
      <Footer />
    </>
  );
};

export default EditCard;

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

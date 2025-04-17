import React, { useState, useContext } from 'react';
import UsersContext from '../contexts/UsersContext';
// import { User as UserType } from '../../types';
import styled from 'styled-components';

function UserPage() {
    const { loggedInUser } = useContext(UsersContext);
    const [avatar, setAvatar] = useState(loggedInUser?.avatar || '');
  
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setAvatar(result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
        <UserWrapper>
          <h2>{loggedInUser?.name}'s Profile</h2>
          <AvatarUploadForm>
            <input type="file" onChange={handleAvatarChange} />
            <img src={avatar || '/default-avatar.png'} alt="Avatar" width="100" height="100" />
            <button type="submit">Save Avatar</button>
          </AvatarUploadForm>
        </UserWrapper>
      );
    }

export default UserPage;

const UserWrapper = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

const AvatarUploadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import styled from 'styled-components';
import { Card, CardHeader, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import { CardType, User } from '../../../types';

type Props = {
  card: CardType;
  onDelete?: (id: string) => void;
  onSave?: (id: string) => void;
  onEdit?: (id: string) => void;
};

const CarsCard = ({ card, onDelete, onSave, onEdit }: Props) => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("UsersContext must be used within a Provider");

  const { users, loggedInUser } = context;
  const creator: User | undefined = users.find((u) => u.id === card.creatorId);
  const isSaved = loggedInUser?.saved?.includes(card.id);

  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar src={creator?.avatar || ''} />}
        title={creator?.name}
      />
      {card.pic && <Image src={card.pic} alt={card.name} />}
      <CardContent>
        <h3>{card.brand} {card.name}</h3>
        <p>Year: {card.yearOfManufacture}</p>
        <p>Engine type: {card.engine.join(', ')}</p>

        <Actions>
          {onEdit && (
            <IconButton onClick={() => onEdit(card.id)}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(card.id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {onSave && (
            <IconButton onClick={() => onSave(card.id)}>
              <BookmarkIcon color={isSaved ? 'primary' : 'action'} />
            </IconButton>
          )}
        </Actions>
      </CardContent>
    </StyledCard>
  );
};

export default CarsCard;

const StyledCard = styled(Card)`
  margin: 1rem;
  padding: 0.5rem;
  height: 550px;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 120px;
  object-fit: cover;
`;

const CardContent = styled.div`
  margin: auto;
  text-align: left;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

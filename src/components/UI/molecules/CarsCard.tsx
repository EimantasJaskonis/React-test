import styled from 'styled-components';
import { Card, CardContent, CardHeader, IconButton, Avatar } from '@mui/material';
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
  isSaved?: boolean;
};

const CarsCard = ({ card, onDelete, onSave, onEdit, isSaved }: Props) => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("UsersContext must be used within a Provider");

  const { users, loggedInUser } = context;
  const creator: User | undefined = users.find((u) => u.id === card.creatorId);

  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar src={creator?.avatar || ''} />}
        title={creator?.name}
        subheader={new Date(card.createdAt).toLocaleDateString()}
        action={
          loggedInUser?.id === creator?.id && (
            <>
              <IconButton onClick={() => onEdit?.(card.id)}><EditIcon /></IconButton>
              <IconButton onClick={() => onDelete?.(card.id)}><DeleteIcon /></IconButton>
            </>
          )
        }
      />
      {card.pic && <Image src={card.pic} alt={card.name} />}
      <CardContent>
        <h3>{card.brand} {card.name}</h3>
        <p>Year: {card.yearOfManufacture}</p>
        <p>Engine types: {card.engine.join(', ')}</p>
        {loggedInUser && (
          <IconButton onClick={() => onSave?.(card.id)}>
            <BookmarkIcon color={isSaved ? 'primary' : 'action'} />
          </IconButton>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CarsCard;

const StyledCard = styled(Card)`
  margin: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
`;

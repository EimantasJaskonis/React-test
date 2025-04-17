  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    passwordText: string;
    role: string;
    avatar?: string;
    saved?: string[];
  };

  export type CardType = {
    id: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
    createdAt: string;
    brand: string;
    name: string;
    yearOfManufacture: string;
    engine: string[];
    pic?: string;
  };

  export type Props = {
    card: CardType;
    onDelete: (id: string) => void;
    onSave: (id: string) => void;
  };
  
  export type ChildrenElementType = {
    children: React.ReactNode;
  };
  
  export type UsersReducerActionTypes =
    | { type: 'setData'; data: User[] }
    | { type: 'addNew'; newUser: User }
    | { type: 'delete'; id: string };
  
  export type UsersContextTypes = {
    loggedInUser: User | null;
    logout: () => void;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: User[];
    dispatch: React.Dispatch<UsersReducerActionTypes>;
  };

  export type UsersProviderProps = {
    children: React.ReactNode;
  };
  
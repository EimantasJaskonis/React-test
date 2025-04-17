import { createContext, useState, useReducer, useEffect } from "react";
import { User, ChildrenElementType, UsersContextTypes, UsersReducerActionTypes } from "../../types";

const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {
  switch (action.type) {
    case 'setData':
      return action.data;
    case 'addNew':
      return [...state, action.newUser];
    case 'delete':
      return state.filter(user => user.id !== action.id);
    default:
      return state;
  }
};

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

const UsersProvider = ({ children }: ChildrenElementType) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [users, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then((data: User[]) => {
        dispatch({ type: 'setData', data });
      })
      .catch(error => console.error('Failed to fetch users:', error));
  }, []);

  return (
    <UsersContext.Provider value={{ loggedInUser, setLoggedInUser, users, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;

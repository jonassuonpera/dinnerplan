import React from 'react';
import {User} from './interfaces/userInterface';
 
const UserContext = React.createContext<User | null>(null);
 
export default UserContext;
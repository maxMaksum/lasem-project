import { createContext, useEffect, useState } from 'react';

export const Store = createContext();

export function StoreProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [lastRm, setLastRm] = useState(null);
  const [userEdit, setUserEdit] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
 
const addUsers = (newUser) => {
  setUsers(newUser);
};

const readUsers = () => {
   return users
};

const updateUsers = (id, x) => {
  const editUsers = users.filter(user => {
    return user._id !== x._id})
  setUsers([...editUsers, x])

};

const removeUsers = (id)=>{
  const userLists = users.filter((user) => user._id !== id );
  setUsers( userLists)
}

const resetUsers = ()=>{

  setUsers([])
}



  return (
    <Store.Provider value={{
      users,
      setUsers,
      addUsers,
      readUsers,
      resetUsers,
      removeUsers,
      updateUsers,
      showSpinner,
      setShowSpinner,
      showUpdate,
      setShowUpdate,
      userEdit, 
      setUserEdit,
      showAddForm, 
      setShowAddForm,
      lastRm, setLastRm,
      searching, setSearching
  
    }}>
  
   {children}
   
   </Store.Provider>
  )
  
  
}
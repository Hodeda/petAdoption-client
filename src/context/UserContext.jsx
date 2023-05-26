import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UserContextInstance = React.createContext()

export const UserContext = ({children}) => {
  const [token, setToken] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loadingAdmin, setLoadingAdmin] = useState(true)
  const [userDetailsChanged, setUserDetailsChanged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setLoading(false)
    setLoadingAdmin(false)
  }, []);

  useEffect(() => {
    if(!token) {
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/verify`, {
          headers: {
            Authorization: `Bearer ${token}`
        }})
        setUserDetails(response.data)
        setIsAuthenticated(true)
        if(response.data.isAdmin) {
          setIsAdmin(true)
          setLoadingAdmin(false)
          setUserDetailsChanged(false)
        } else {
          setIsAdmin(false)
          setLoadingAdmin(false)
          setUserDetailsChanged(false)
        }
      } catch (error) {
        console.log(error)
        setToken('')
        localStorage.removeItem("token");
        setUserDetails(null)
        setIsAuthenticated(false)
        return;
      };  
  }
    fetchUser()
  }, [token, userDetailsChanged])

  const updateUserDetails = (newDetails) => {
    setUserDetails(newDetails);
  };

  return (
    <UserContextInstance.Provider value={{token, setToken, userDetails, updateUserDetails, isAuthenticated, loading, isAdmin, loadingAdmin,setUserDetailsChanged}}>
        {children}
    </UserContextInstance.Provider>
  )
}


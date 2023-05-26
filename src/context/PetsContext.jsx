import React, { useState } from 'react'

export const PetsContextInstance = React.createContext()

export const PetsContext = ({children}) => {
    const [isRequestSent, setIsRequestSent] = useState(false)
    const [requestBody, setRequestBody] = useState({})
    

  return (
    <PetsContextInstance.Provider value={{setIsRequestSent,setRequestBody,requestBody,isRequestSent}}>
        {children}
    </PetsContextInstance.Provider>
  )
}

import { useState } from 'react'

export default function useToken () {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken
  }

  const [token, setToken] = useState(getToken()) // sets token if already exists.

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken)) // saves the received token.
    setToken(userToken)
  }
  return {
    setToken: saveToken,
    token
  }
}

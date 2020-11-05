import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GoogleLogout } from 'react-google-login'
import { USER_TOKEN } from '../constants/main'
import { logout } from '../store/actions/auth.action'

const Logout = (props) => {
  console.log('Logout props: ', props)
  const router = useRouter()

  useEffect(() => {
    // const token = window.localStorage.getItem(USER_TOKEN)
    // if (!token) {
    //   router.push('/login')
    // }
  })

  const logout = () => {
    console.log('logout')
    localStorage.removeItem(USER_TOKEN)
    router.push('/login')
    props.logout()
  }

  return (
    <div>
      <GoogleLogout
        clientId="413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={logout}
      ></GoogleLogout>
    </div>
  )
}

export default Logout

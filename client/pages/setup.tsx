import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { GoogleLogout } from 'react-google-login'
import { USER_TOKEN } from '../constants/main'
import { logout } from '../store/actions/auth.action'
import {makeStyles} from "@material-ui/core/styles";
import styles from '../components/css/nav.module.css'
import TwitterLogin from 'react-twitter-auth';
import { TwitterSignin } from '../api/twit.api'
import Axios from 'axios'


interface OtherProps {
  getStaticProp: string
  appProp: string
}

const SetupPage = (props) => {
  console.log('Setup props: ', props)
  const { firstName } = props.user
  const router = useRouter()

  const useStyles = makeStyles(() => ({
    mainCarousel: {
      width: 'min(108vh, 50%)',
      margin: '0',
      padding: '0',
    },
    carouselItem: {
      height: '100vh',
      width: '51vw',
    },

    text: {
      position: 'fixed',
      top: '50%',
      left: '51%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontFamily: 'arial',
      textDecoration: 'none',
      fontSize: '1.8em',
      zIndex: 'auto',
      color: 'black',
      backgroundColor: 'chartreuse',
    },

    outerBody: {
      position: 'relative',
      textAlign: 'center',
    },
  }))

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    /*if (!token) {
      router.push('/login')
    }*/


  })

  const onTwitterSignin = (email, pwd : Object) => {
    props.TwitterSignin(email, pwd)
  }


  const onTwitterSuccess = (response) => {

    const token = response.headers.get('x-auth-token');
    //or ?
    //const token = window.localStorage.getItem(TWITTER_TOKEN)
    response.json().then(user => {
      if (token) {
        user.getState({isAuthenticated: true, user: user, token: token})
      }
    });
  }

  const onTwitterFailed = (error) => {
    alert(error)
  }




  // const googleClientID: string = process.env.GOOGLE_CLIENT_ID

  const logout = () => {
    console.log('logout')
    localStorage.removeItem(USER_TOKEN)
    router.push('/login')
    props.logout()
  }


  const customHeader = {};
  customHeader['Test'] = 'test-header';

  return (
    <div>
      Cagan Setup Page -- Hi {firstName}
      <header>
        <noscript>
          <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
        </noscript>
        <nav>
          <p>
            <Link href="/">
              <a className={styles.link}> Main Page</a>
            </Link>
            <Link href="/">
              <a> About Me</a>
            </Link>
          </p>

          <p>
                <>
                  <a href="/api/auth/signin"
                     onClick={(e) => {
                       e.preventDefault();
                       signin('spotify');
                     }}
                  >
                    <button className={"signInButton"}>Sign In with Spotify</button>
                  </a>
                  <TwitterLogin loginUrl="http://localhost:3000/auth/twitter/redirect" //Back end URL
                                onFailure={onTwitterFailed}
                                onSuccess={onTwitterSuccess}
                                requestTokenUrl="http://localhost:3000/auth/twitter/redirect"
                                showIcon={true}
                                customHeaders={customHeader}
                                />
                </>

          </p>
        </nav>
        <style jsx>{`

        header {
        border-bottom: 1px solid #ccc;
        }

        nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 120rem;
        padding: 0.2rem 1.25rem;
        margin: 0 6% 0 0;
        }

        p {
        display: grid;
        grid-auto-flow: column;
        gap: 40px;
        align-items: center;
        }

        .signInButton,
        .signOutButton{
        background-color: #1eb1fc;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        }

        .signInButton:hover {
          background-color: #1b9fe2;
        }

        .signOutButton {
          background-color: #333;
        }

        .signOutButton:hover {
          background-color: #555;
        }
        
        .avatar {
          border-radius: 2rem;
          float: left;
          height: 2.2rem;
          width: 2.2rem;
          background-color: white;
          background-size: cover;
          border: 1px solid #ddd;
        }
        
        .email{
          font-weight: 600;
        }

      `}</style>
      </header>

      <div>
        <GoogleLogout
          clientId="413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={logout}
          theme="dark"
        ></GoogleLogout>
      </div>
    </div>
  )
}

// export const getStaticProps = wrapper.getStaticProps(({ store }) => {
//   store.dispatch({ type: 'PAGE', payload: 'login' })
//   return { props: { getStaticProp: 'bar' } }
// })

SetupPage.getInitialProps = (props) => ({
  //TODO: verify auth token
  // custom: 'custom', // pass some custom props to component
})

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ TwitterSignin, logout }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)

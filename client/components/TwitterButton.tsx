import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import styles from "./css/nav.module.css";
import {TwitterSignin} from "../api/twit.api";
import {USER_EMAIL} from "../constants/main";


interface LoginProps {
    onTwitterSignin: Function
}

const TwitterButton: React.FC<LoginProps> = ({ onTwitterSignin }: LoginProps) => {


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

    const onTwitterFailed = (res) => {
        console.log('FAILED: ' + res)
    }



    return (
        <div>
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
                            <a href=""
                               onClick={(e) => {
                                   e.preventDefault();
                                   TwitterSignin(localStorage.getItem(USER_EMAIL))

                               }}
                            >
                                <button className={"signInButton"}>Sign In with Twitter</button>
                            </a>
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
        </div>
    )
}



export default TwitterButton

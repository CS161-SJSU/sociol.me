import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { State } from '../store/reducers'
import { wrapper } from '../store/store'
import { bindActionCreators } from 'redux'

import SignIn from '../components/SignIn'
import { login } from '../api/login.api'

interface OtherProps {
  getStaticProp: string
  appProp: string
}

const LoginPage: NextPage<OtherProps> = ({ appProp, getStaticProp }) => {
  const { app, page } = useSelector<State, State>((state) => state)
  return (
    <div className="login">
      <SignIn />
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  store.dispatch({ type: 'PAGE', payload: 'login' })
  return { props: { getStaticProp: 'bar' } }
})

export default LoginPage

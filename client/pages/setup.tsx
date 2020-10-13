import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { State } from '../store/reducers'
import { wrapper } from '../store/store'
import { bindActionCreators } from 'redux'

interface OtherProps {
  getStaticProp: string
  appProp: string
}

const SetupPage: NextPage<OtherProps> = () => {
  return <div>Setup Page</div>
}

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  store.dispatch({ type: 'PAGE', payload: 'login' })
  return { props: { getStaticProp: 'bar' } }
})

export default SetupPage

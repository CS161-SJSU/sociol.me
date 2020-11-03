import React from 'react'
import { connect } from 'react-redux'
import { State } from '../store/reducers'
import Landing from '../components/Landing'

export interface PageProps extends State {
  pageProp: string
  appProp: string
}

class Index extends React.Component<PageProps> {
  render() {
    return (
      <div>
        <Landing />
      </div>
    )
  }
}

export default connect((state) => state)(Index)

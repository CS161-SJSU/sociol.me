import * as React from 'react'

import { Error401Page } from 'tabler-react'
import FormPage from './FormPage'

function Error401(props) {
  return (
    <FormPage imageURL={'./images/logo.svg'}>
      <Error401Page />
    </FormPage>
  )
}

export default Error401

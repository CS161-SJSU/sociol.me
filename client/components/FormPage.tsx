import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`
const Page = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  height: 68rem;
`

function FormPage(props) {
  return (
    <Wrapper>
      <Page>
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="center-content mb-6">
                  <img src={props.imageURL} className="h-7" alt="logo" />
                </div>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Wrapper>
  )
}

export default FormPage

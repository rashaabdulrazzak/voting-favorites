import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import './scss/AppStyles.scss';
import{Container,Navbar,Nav} from 'react-bootstrap'

import { BrowserRouter as Router, Routes ,Route  } from "react-router-dom";
import getConfig from './config'

// components
import Home from './components/Home'
import NewPoll from './components/NewPoll'
import PollingStation from './components/PollingStation'
//images
import logo from './assets/logo.jpg'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const changeCandidateFunction = async (prompt)=>{    
      let namePair = await  window.contract.getCandidatePair({prompt});
      console.log(namePair)
      localStorage.setItem('Candidate1',namePair[0])
      localStorage.setItem('Candidate2',namePair[1])
      localStorage.setItem('Prompt',prompt)    
      window.location.replace(window.location.href+'polystation')
  }
  return (<>
  <Router >
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/"><img src={logo} style={{'width':'50px','height':'50px'}}/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
     
    </Nav>
    <Nav>
      <Nav.Link href='/newpoll'>New Poll</Nav.Link>
     
      <Nav.Link onClick={window.accountId ===''? login:logout}>
      {window.accountId ===''? 'login':window.accountId}
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
  <Route exact path='/' element={<Home changeCandidates={changeCandidateFunction} />} />
   
  
  <Route exact path='/polystation' element={<PollingStation />}/>
   

  <Route exact path='/newpoll'  element={<NewPoll />}/>
   
  
</Routes>
</Router>



</>
)
}
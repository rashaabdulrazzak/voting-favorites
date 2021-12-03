import React,{useState,useEffect} from 'react';
import { Container,Col, Row,Button } from 'react-bootstrap';
import loading from '../assets/loading.jpg'
const PollingStation = props => {
  const [candidate1Url,changecandidate1Url] = useState(loading)
  const [candidate2Url,changecandidate2Url] = useState(loading)
  const [promptText,changePromptText] = useState('loading')
  const [showResults,changeResultsDisplay] = useState(true)
  const [cadidateVotes1,changeVotes1] = useState('0')
  const [cadidateVotes2,changeVotes2] = useState('0')

  useEffect(() => {
    const getInfo = async ()=>{
      // vote count 
      let voteCount = await window.contract.getVotes({
        prompt : localStorage.getItem("Prompt")
      })
      changeVotes1(voteCount[0])
      changeVotes2(voteCount[1])
      // prompt text
      changePromptText(localStorage.getItem('Prompt'))
      // image staff
      changecandidate1Url(await window.contract.getUrl({
        name:localStorage.getItem('Candidate1')
      }))
      changecandidate2Url(await window.contract.getUrl({
        name:localStorage.getItem('Candidate2')
      }))

      // check voting 
      let didUserVote = await window.contract.didParticipte({
        prompt : localStorage.getItem("Prompt"),
        user: window.accountId
      })
      changeResultsDisplay(didUserVote)      
    }
    getInfo()
  }, [])
  const addVote = async (index)=>{
    await window.contract.addVote({
      prompt : localStorage.getItem("Prompt"),
      index:index
    })
    await window.contract.recordUser({
      prompt : localStorage.getItem("Prompt"),
      user: window.accountId
    })
    changeResultsDisplay(true)
  }
  return (
 
    <Container>
     <p style={{textAlign:'center',marginTop:'10px'}}> Please Note:To See your votes and others you need to vote first and after the results appear please refresh the page</p> 
    <Row>
      <Col className='jutify-content-center d-flex'>
        <Container>
          <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>  
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2vw",
              }}
            >
              <img
                style={{
                  height: "35vh",
                  width: "20vw",
                }}
                src={candidate1Url}
              ></img>
            </div>
          </Row>
          {showResults ? (
            <Row
              className='justify-content-center d-flex'
              style={{ marginTop: "5vh" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8vw",
                  padding: "6px",
                  backgroundColor: "#c4c4c4",
                }}
              >
                {cadidateVotes1}
              </div>
            </Row>
          ) : null}
          <Row
            style={{ marginTop: "5vh" }}
            className='justify-content-center d-flex'
          >
            <Button disabled={showResults} onClick={()=>addVote(0)}>Vote</Button>
          </Row>
        </Container>
      </Col>
      <Col className='justify-content-center d-flex align-items-center'>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#41AFA4",
            height: "20vh",
            alignItems: "center",
            padding: "2vw",
            textAlign: "center",
          }}
        >
          {promptText}
        </div>
      </Col>
      <Col className='jutify-content-center d-flex'>
        <Container>
          <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2vw",
              }}
            >
              <img
                style={{
                  height: "35vh",
                  width: "20vw",
                }}
                src={candidate2Url}
              ></img>
            </div>
          </Row>
          {showResults ? (
            <Row
              className='justify-content-center d-flex'
              style={{ marginTop: "5vh" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8vw",
                  padding: "8px",
                  backgroundColor: "#c4c4c4",
                }}
              >
               {cadidateVotes2}
              </div>
            </Row>
          ) : null}
          <Row
            style={{ marginTop: "5vh" }}
            className='justify-content-center d-flex'
          >
            <Button disabled={showResults} onClick={()=>addVote(1)}>Vote</Button>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
  );
};


export default PollingStation;
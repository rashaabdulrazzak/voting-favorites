import React,{useRef} from 'react';
import { Container,Form ,Button } from 'react-bootstrap';

const NewPoll = props => {
 const candidateName1 = useRef()
 const candidateName1Url = useRef()
 const candidateName2 = useRef()
 const candidateName2Url = useRef()
 const promptRef = useRef()

 const sendToBlockChain = async () =>{   
   await window.contract.addUrl({
     name:candidateName1.current.value,
     url: candidateName1Url.current.value
   })
   await window.contract.addUrl({
    name:candidateName2.current.value,
    url: candidateName2Url.current.value
  })
  await window.contract.addCandidatePair({
    prompt : promptRef.current.value,
    name1:candidateName1.current.value,
    name2:candidateName2.current.value

  })
  await window.contract.addToPromptArray({
    prompt :  promptRef.current.value
  })
 }
  return (
    <Container style={{marginTop:'10vh'}}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Candidate</Form.Label>
          <Form.Control ref={candidateName1} placeholder="Enter Your Candidate 1 Name"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Candidate1 Image Url</Form.Label>
          <Form.Control ref={candidateName1Url} placeholder="Enter Your Candidate 1 Image Url"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Candidate 2</Form.Label>
          <Form.Control ref={candidateName2} placeholder="Enter Your Candidate 2 Name"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Candidate 2 Image Url</Form.Label>
          <Form.Control ref={candidateName2Url} placeholder="Enter Your Candidate 2 Image Url"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Prompt</Form.Label>
          <Form.Control ref={promptRef} placeholder="Enter Prompt"></Form.Control>
        </Form.Group>
      </Form>
      <Button onClick={sendToBlockChain} variant="primary">Submit</Button>
    </Container>
  );
};


export default NewPoll;
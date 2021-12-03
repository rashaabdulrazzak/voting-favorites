import React,{useEffect, useState} from 'react';
import {Table,Container,Button} from 'react-bootstrap'
const Home = props => {
  const [promptedList ,setPromptedList]= useState([])
  useEffect(() => {   
   
    const id = setInterval(async () => {      
     await window.contract.getAllPrompt()
        .then((prompts) => {         
          setPromptedList(prompts)});
    }, 1000); 
    return () => clearInterval(id);
  }, []);
  return (
    <Container>
      <Table style={{margin:'5vh'}} striped bordered hover>
        <thead>
          <tr>
             <th>*</th> 
             <th>List of polls</th>  
             <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody>
        {
          promptedList.map(((el,index)=>{
            return( <tr key={index}>
                <td>{index+1}</td>
                <td>{el}</td>
                <td> {""} <Button onClick={() =>props.changeCandidates(el)}>Go to poll</Button></td>
              </tr>)
          }))
        }
        </tbody>
      </Table>
      
    </Container>
  );
};



export default Home;
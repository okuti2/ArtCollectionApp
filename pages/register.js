import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";


export default function Login(props){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        registerUser(userName, password, password2).then(()=>{
            router.push('/login');
        }).catch(err=>{
            setWarning(err.message);
        })
    }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control value={userName} onChange={e => setUserName(e.target.value)} type="text" id="userName" name="userName" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label><Form.Control value={password2} onChange={e => setPassword2(e.target.value)} type="password" id="password2" name="password2" />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
    </>
  );
}
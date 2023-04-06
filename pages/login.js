import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from '@/store';
import { useAtom } from "jotai";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";


export default function Login(props){

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  
  const router = useRouter();

  async function handleSubmit(e){
      e.preventDefault();
      authenticateUser(userName, password).then(async ()=>{
        await updateAtoms()// issue here 
        router.push('/favourites');
      }).catch(err=>{
          setWarning(err.message);
      })
  }

  async function updateAtoms(){
    setFavouritesList(await getFavourites()); //issue here 
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
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
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
    </>
  );
}
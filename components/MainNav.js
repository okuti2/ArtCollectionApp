import {Container, Form, Nav, Navbar, Button, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';


export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    function logout(){
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }


    async function handleSubmit(e){
        let queryString = `title=true&q=${searchField}`;      
        e.preventDefault();
        setIsExpanded(false);
        //setSearchHistory([...searchHistory, queryString]); 
        setSearchHistory(await addToHistory(queryString));
        router.push(`/artwork?title=true&q=${searchField}`);
    }
    
    return (
      <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Olutoyosi Kuti</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={()=> setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" passHref legacyBehavior><Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
                            {token &&<Link href="/search" passHref legacyBehavior><Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
                        </Nav> &nbsp;
                        {!token && 
                        <Nav>
                            <Link href="/register" passHref legacyBehavior><Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                            <Link href="/login" passHref legacyBehavior><Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/login"}>Log In</Nav.Link></Link>

                        </Nav>}
                        {token &&<Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchField}
                            onChange={e=>{setSearchField(e.target.value)}}
                            />
                            <Button variant="light" type="submit">Search</Button>
                        </Form>}&nbsp;
                        <Nav>
                            {token &&<NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item href="/favourites" onClick={()=>setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>
                                <Link href="/history" passHref legacyBehavior><NavDropdown.Item href="/history" onClick={()=>setIsExpanded(false)}>Search History</NavDropdown.Item></Link> 
                                {/* why do we remove the active feature on the favourites and search history iems */}
                                <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
}



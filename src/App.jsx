import React, { Fragment, useContext, useEffect, useState } from "react";
import "./App.scss";
import "./components/login/style.scss";
import { Switch, Route } from "react-router-dom";
import SideNav, { Toggle, Navi, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import {
  Navbar, NavbarBrand, Container, Link, Nav, Button, Offcanvas, Col, Row, Form, InputGroup,
  FormControl, Image, Card
} from 'react-bootstrap'
import Authentication from "./components/login/Authentications";
import { AuthContext } from "./service/authentication";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/login";
import Register from "./components/login/register"
import SimpleForm from "./chatbot/chatbot"
import { Posts } from "./components/Posts";
import { DisplayPosts } from "./components/DisplayPosts"
import About from "./components/About";
import { UpdatePost } from "./components/UpdatePost"
import { useHistory } from 'react-router-dom';
import { getAllPosts } from "./util/user"
import RequestPage from "./components/requestPage"
import TableRow from "./components/TableRow"
import Footer from "./components/Footer/footer";
import "./components/Footer/footer.scss"
import FormView from "./components/FormView"
import { MessageComments } from "./components/MessageComments"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const authContext = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  let history = useHistory();


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (user && token) {
      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user,
          token,
        },
      });
    }
  }, []);
  const fetchPosts = async () => {
    const response = await getAllPosts();
    console.log(response.data);
    if (response.data) {
      setPostsData(response.data);
    }
  };



  useEffect(() => {
    // if (authContext.state.isAuthenticated) {
    fetchPosts();
    // }
  }, []);


  function handleLogout() {
    authContext.dispatch({
      type: authContext.ActionTypes.LOGOUT,
      
    });
    window.location.reload();
    history.push('/')
  
  }

  return (
    <Fragment>

      {authContext.state.isAuthenticated && authContext?.state?.user?.role === "admin" && (
        <>
          <Navbar variant="dark" style={{ background: "grey" }}>
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">

              </Nav>
            </Container>
          </Navbar>

          <SideNav style={{ background: "#6bdcf5", position: "fixed" }}
            onSelect={(selected) => {
              // Add your code here
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home" >
              <NavItem eventKey="newsfeed">
                <NavIcon href="/newsfeed">
                  <i className="fa fa-fw fa-newspaper-o " style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/newsfeed">NewsFeed</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="home">
                <NavIcon href="/addPost">
                  <i className="fa fa-fw fa-plus-circle" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/addPost">Add Post</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="ChatBot">
                <NavIcon>
                  <i className="fa fa-fw fa-weixin" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/chatbot">ChatBot</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="Requests">
                <NavIcon>
                  <i className="fa fa-fw fa-bell" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/requests">Requests</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="LogOut">
                <NavIcon>
                  <i className="fa fa-fw fa-window-close-o " style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" onClick={handleLogout} >Log Out</a>
                </NavText>
              </NavItem>

            </SideNav.Nav>
          </SideNav>
        </>


      )}
      {authContext.state.isAuthenticated && authContext?.state?.user?.role === "user" && (
        <>
          <Navbar variant="dark" style={{ background: "grey" }}>
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">

              </Nav>
            </Container>
          </Navbar>

          <SideNav style={{ background: "#6bdcf5", position: "fixed" }}
            onSelect={(selected) => {
              // Add your code here
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home" >
              <NavItem eventKey="newsfeed">
                <NavIcon href="/newsfeed">
                  <i className="fa fa-fw fa-newspaper-o " style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/newsfeed">NewsFeed</a>
                </NavText>
              </NavItem>

              <NavItem eventKey="ChatBot">
                <NavIcon>
                  <i className="fa fa-fw fa-weixin" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/chatbot">ChatBot</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="Revires">
                <NavIcon>
                  <i className="fa fa-fw fa-bell" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" href="/reviews">Reviews</a>
                </NavText>
              </NavItem>
              <NavItem eventKey="LogOut">
                <NavIcon>
                  <i className="fa fa-fw fa-window-close-o " style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <a className="nav-link" onClick={handleLogout} >Log Out</a>
                </NavText>
              </NavItem>

            </SideNav.Nav>
          </SideNav>
        </>



      )}


      {(authContext.state.isAuthenticated || !authContext.state.isAuthenticated) && (
        <>
          <Switch>
            <Route exact path="/">
              <Authentication />
            </Route>
            <Route exact path="/addPost">
              <Posts />
            </Route>
            <Route exact path="/displayPosts">
              <DisplayPosts data={postsData} />
            </Route>
            <Route exact path="/newsfeed">
              <About data={postsData} />
            </Route>
            <Route exact path="/chatbot">
              < SimpleForm />
            </Route>

            <Route exact path="/requests" >
              <RequestPage />
            </Route>
            <Route exact path="/form" >
              <FormView />
            </Route>
            <Route exact path="/reviews" >
              <MessageComments />
            </Route>
            <Route exact path="/tableView"
              component={(props) =>

                < TableRow />

              }
            />
            <Route exact path="/UpdatePost/:id" component={(props) =>
              < UpdatePost
                id={props.match.params.id}
                title={props.location.state.title}
                date={props.location.state.date}
                desc={props.location.state.desc} />

            } />


            <Route>{() => <h1>404 | Not Found</h1>}</Route>
          </Switch>

          <ToastContainer autoClose={5000} /></>
      )
      }


    </Fragment>

  );



}


export default App;

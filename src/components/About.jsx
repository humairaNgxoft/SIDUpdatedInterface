import React, {
  Fragment, useRef,
  useContext, useEffect, useState
} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {
  Button, Offcanvas, Container, Col, Row, Form, InputGroup,
  FormControl, Image, Card,
} from 'react-bootstrap'
import moment from "moment"
import Nav from 'react-bootstrap/Nav'
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';

import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { getAllPosts, deletePost } from "../util/user"
import SideNav, { Toggle, Navi, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Table from 'react-bootstrap/Table'
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Select from 'react-select'



export default function About() {


  const [selectedItem, setSelectedItem] = useState(0)
  const [active, setActive] = useState("false")


  const authContext = useContext(AuthContext);
  const { state } = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  let history = useHistory();

  const fetchPosts = async () => {
    const response = await getAllPosts();
    console.log(response.data);
    if (response.data) {
      setPostsData(response.data);

      // setSelectedItem(0)
    }
    console.log(postsData, "postData")
  };
  const displayPost = (id) => {
    // setShowForm(!showForm);
    history.push('/displayPosts/')

  }
  const addPost = (id) => {
    history.push('/addPost/')
  }
  const editPost = (id) => {
    // setShowForm(!showForm);
    history.push('/UpdatePost/' + id, { id, title: postsData.title, date: postsData.date })
  }
  const delPost = async (id, token) => {

    const response = await deletePost(id, token);
    console.log(response);
    if (response.data) {
      toast.success("Post Deleted Successfully")
    } else {
      toast.error("An error occured during deletion")
    }
    window.location.reload();
    history.push('/')
  }
  // const getModal = (id) => {
  //   setShowModal({ showModal: id });
  //   setTitle(id.title)
  // }

  useEffect(() => {
    // if (authContext.state.isAuthenticated) {
    fetchPosts();

    // }
  }, [selectedItem]);

  const pickerItems = postsData.map((trip, i) => {
    const someDay = new Date(trip.date)
    return {
      label: `${moment(someDay).format('DD/MM/YYYY')}`,
      value: i
    };
  });

  console.log(pickerItems);
  const onDropdownSelected = (e) => {
    setActive("true")
    setSelectedItem(e.value)
    //here you will see the current selected value of the select input
  }
  if (!authContext.state.isAuthenticated) {
    return <Redirect to="/" />;
  } else if (authContext.state.isAuthenticated) {
    return (

      <div style={{ background: "#ebebeb", height: "100%" }}>

        <Container className="mainBox" style={{ marginLeft: "auto", marginRight: "30px", width: "70%" }}>

          <h5>Notice Board</h5>
          <Row style={{ background: "white", paddingTop: "20px" }}>
            {console.log(postsData[selectedItem], postsData, selectedItem, "selected")}
            {/* {selectedItem >= 0 && ( */}

            <Col xs={3} className="imageBox">
              <h5 style={{ display: "inline-block", marginRight: "5px" }}>Search</h5>
            </Col>
            <Col xs={7} className="imageBox">
              <Select
                value={pickerItems.value}
                options={pickerItems}
                onChange={(e) => onDropdownSelected(e)}
              />
            </Col>
            <Col xs={7} className="imageBox">
              {authContext?.state?.user?.role === "admin" && (<>
                <Button variant="primary"
                  onClick={() => addPost(postsData[selectedItem]?._id, authContext.state.token)}
                >
                  Add Post</Button>

              </>)}
              {/* ) */}
              {/* } */}
            </Col>

            {/* <Row>
            <Col xs={{ span: 6, offset: 2 }}>
            
            </Col>
            <Col xs={2} s={6} m={6} l={6}>


            </Col>

          </Row> */}
            <Col xs={12} >

              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Sr no</th>
                    <th>Notice Title</th>
                    <th>Notice Description</th>
                    <th>Notice Date</th>
                    {authContext?.state?.user?.role === "admin" && (<>   <th>Edit</th>
                      <th>Delete</th> </>)}

                  </tr>
                </thead>

                {console.log(postsData.length, postsData, selectedItem, "selected")}
                {active == "true" ?
                  <tbody>
                    <tr>
                      <td>{selectedItem}</td>
                      <td>{postsData[selectedItem]?.title}</td>
                      <td>{postsData[selectedItem]?.desc}</td>
                      <td>{moment(postsData[selectedItem]?.date).format('DD/MM/YYYY')}</td>
                      {authContext?.state?.user?.role === "admin" && (<>
                        <td><Button variant="primary"
                          onClick={() => editPost(postsData[selectedItem]?._id)}>Edit</Button></td>
                        <td><Button variant="primary"
                          onClick={() => delPost(postsData[selectedItem]?._id, authContext.state.token)}>Delete</Button></td></>)}

                    </tr>

                  </tbody>
                  : <tbody>
                    {postsData.map((item, i) => {
                      return (<tr>
                        <td>{i + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                        <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                        {authContext?.state?.user?.role === "admin" && (<>
                          <td><Button variant="primary"
                            onClick={() => editPost(item?._id)}>Edit</Button></td>
                          <td><Button variant="primary"
                            onClick={() => delPost(item?._id, authContext.state.token)}>Delete</Button></td></>)}


                      </tr>
                      )
                    })}
                  </tbody>

                }
                {/* {selectedItem < 0  ? "nothimg":selectedItem} */}


              </Table>


            </Col>
          </Row>

          <Row style={{ background: "#f3f3f3" }}>
            <Col xs={12} style={{ textAlign: "right" }}>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="active">1</Button>
                <Button variant="secondary">2</Button>
                <Button variant="secondary">3</Button>
              </ButtonGroup>
            </Col>
          </Row>

        </Container>
      </div >

    )
  }
}




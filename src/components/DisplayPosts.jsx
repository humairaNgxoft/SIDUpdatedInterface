import React, {
    Fragment, useRef,
    useContext, useEffect, useState
} from 'react'

import {
    Button, Offcanvas, Container, Col, Row, Form, InputGroup,
    FormControl, Image, Card,
} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';

import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { getAllPosts, deletePost } from "../util/user"




export const DisplayPosts = (props) => {

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(0)
    const [title, setTitle] = useState('')


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const authContext = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const [postsData, setPostsData] = useState([]);
    let history = useHistory();

    const fetchPosts = async () => {
        const response = await getAllPosts();
        console.log(response.data);
        if (response.data) {
            setPostsData(response.data);
        }
    };

    const delPost = async (id, token) => {

        const response = await deletePost(id, token);
        console.log(response);
        if (response.data) {
            console.log("deletion sucessfull");
        } else {
            console.log("error");
        }
        window.location.reload();
        history.push('/')
    }
    const editPost = (id) => {
        // setShowForm(!showForm);
        history.push('/UpdatePost/' + id, { title: postsData.title, date: postsData.date })
    }
    const addPost = (id) => {
        history.push('/addPost/')
    }

    const getModal = (id) => {
        setShowModal({ showModal: id });
        setTitle(id.title)
    }

    useEffect(() => {
        // if (authContext.state.isAuthenticated) {
        fetchPosts();
        // }
    }, []);
    if (!authContext.state.isAuthenticated) {
        return <Redirect to="/" />;
      } else if (authContext.state.isAuthenticated) {
    return (

        <div>

            <Container className="mainBox">
                <Row>
                    <Col xs={{ span: 6, offset: 2 }}>
                        <InputGroup className="mb-3">
                            {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </Col>
                    <Col xs={2}> <Button variant="primary" >
                        Stuady now
                    </Button>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <h1>All Posts</h1>
                    </Col>
                </Row>

                {props.data.map((data, key) => {
                    return (
                        <Row key={key}>
                            <Col show={showModal} xs={4} className="imageBox">
                                <Image className="book22" src={BASE_URL + "/" + data?.image || "https://www.w3schools.com/howto/img_avatar.png"} rounded />
                            </Col>
                            <Col xs={8} >

                                <Row>
                                    <Col xs={12} className="imageBox">
                                        <Card.Title>{data?.title}</Card.Title>
                                    </Col>
                                    <Col xs={12} className="imageBox">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{data.title}</Card.Title>
                                                <Card.Text>
                                                    {data.desc}
                                                </Card.Text>
                                                {authContext?.state?.user?.role === "admin" &&
                                                    (
                                                        <>
                                                            <Button variant="primary" onClick={() => addPost(data._id, authContext.state.token)} >Add Post</Button>
                                                            <Button variant="primary" onClick={() => delPost(data._id, authContext.state.token)} >Delete</Button>
                                                            <Button variant="primary" onClick={() => editPost(data._id)} >Edit</Button>

                                                        </>)}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>)
                }
                )
                }
            </Container>
        </div>

    )
}
}

// import React, {
//     Fragment, useRef,
//     useContext, useEffect, useState
// } from "react";
// import { useHistory } from 'react-router-dom';
// import { Card, Button, Form } from 'react-bootstrap';
// import { BASE_URL } from "../util/api";
// import { AuthContext } from "../service/authentication";
// import { getAllPosts, deletePost } from "../util/user"
// import { Redirect } from "react-router-dom";


// export const DisplayPosts = (props) => {


//     const authContext = useContext(AuthContext);
//     const [postsData, setPostsData] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     let history = useHistory();

//     const delPost = async (id, token) => {

//         const response = await deletePost(id, token);
//         console.log(response);
//         if (response.data) {
//             console.log("deletion sucessfull");
//         } else {
//             console.log("error");
//         }
//         window.location.reload();
//         history.push('/')
//     }



//     const fetchPosts = async () => {
//         const response = await getAllPosts();
//         console.log(response.data);
//         if (response.data) {
//             setPostsData(response.data);
//         }
//     };
//     const editPost = (id) => {
//         // setShowForm(!showForm);
//         history.push('/UpdatePost/' + id, { title: postsData.title, date: postsData.date })
//     }
//     const addPost = (id) => {
//         history.push('/addPost/')
//     }
//     useEffect(() => {
//         // if (authContext.state.isAuthenticated) {
//             fetchPosts();
//         // }
//     }, []);
//     // if (!authContext.state.isAuthenticated) {
//     //     return <Redirect to="/" />;
//     // } else if (authContext.state.isAuthenticated) {
//         return (

//             <>
//                 <br />


//                 {postsData.map((item, i) => {

//                     return (<div key={item._id}> <Card bg="primary" text="white" style={{ width: '18rem' }}>
//                         <Card.Header>Header</Card.Header>

//                         <Card.Body >
//                             <Card.Title>{item.title}</Card.Title>

//                             <Card.Img variant="top"
//                                 src={BASE_URL + "/" + item?.image || "https://www.w3schools.com/howto/img_avatar.png"}

//                             // src={item?.image    || "https://www.w3schools.com/howto/img_avatar.png"}

//                             />
//                             <Card.Text>
//                                 {item.desc}
//                             </Card.Text>
//                             <Button onClick={() => addPost(item._id, authContext.state.token)} variant="light">Add Post</Button>
//                             <Button onClick={() => delPost(item._id, authContext.state.token)} variant="light">Delete</Button>
//                             <Button onClick={() => editPost(item._id)} variant="light">Edit</Button>
//                         </Card.Body>
//                     </Card>



//                         <br />

//                         {/* {showForm &&


//                        } */}

//                         {/* </div>))} */}

//                     </div>
//                     )
//                 })}

//             </>

//         );

// }

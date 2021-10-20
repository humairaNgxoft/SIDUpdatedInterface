import React, {
    Fragment, useRef,
    useContext, useEffect, useState
} from "react";
import {
    Button, Offcanvas, Container, Col, Row, Form, InputGroup,
    FormControl, Image, Card,
} from 'react-bootstrap'

import { AuthContext } from "../service/authentication";
import { api } from "../util/api";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'


export const Posts = (props) => {

    let history = useHistory();
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const { state } = useContext(AuthContext);



    const mySubmitHandler = async (e) => {
        console.log(image, "img")
        e.preventDefault()


        const formdata = new FormData();

        formdata.append("date", date);
        formdata.append('title', title);
        formdata.append('desc', desc);
        formdata.append('image', image);

        const response = await api.post("/user/posts", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                auth: state.token,
            },
        });

        if (response.data.success) {
            console.log(response.data)
            toast.success("Post added successfully in newsfeed")

            history.push("/newsfeed")

        } else {
            toast.error("An Error Occured in adding Post")

        }




    }
    if (!state.isAuthenticated) {
        return <Redirect to="/" />;
      } else if (state.isAuthenticated) {

    return (


        <div>
            <Container className="mainBox">

                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 pb-5">
                        <form>
                            <div className="card border-primary rounded-0">
                                <div className="card-header p-0">
                                    <div className="bg-primary text-white text-center py-2">
                                        <h3>Add Your Post Here</h3>

                                    </div>
                                </div>
                                <div className="card-body p-3">

                                    {/* <!--Body--> */}
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                {/* <div className="input-group-text"></div> */}
                                            </div>
                                            <input type="date"
                                                onChange={e => setDate(e.target.value)}
                                                placeholder="Date of posting"
                                                className="form-control"
                                                id="date" name="date"

                                                required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                {/* <div className="input-group-text"></div> */}
                                            </div>
                                            <input type="text" className="form-control"
                                                id="title"
                                                name="title"
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder="Enter Title"
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                {/* <div className="input-group-text"></div> */}
                                            </div>
                                            <input type="file" className="form-control"
                                                id="file"
                                                name="file"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                placeholder="Enter Title"
                                                required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                {/* <div className="input-group-text"></div> */}
                                            </div>
                                            <textarea
                                                className="form-control"
                                                onChange={e => setDesc(e.target.value)}
                                                placeholder="Describe ...."
                                                required></textarea>
                                        </div>
                                    </div>


                                    <div className="text-center">
                                        <input type="submit"
                                            value="Add Post"
                                            onClick={(e) => mySubmitHandler(e)}
                                            className="btn btn-primary btn-block rounded-0 py-2" />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>













        // <div style={{ margin: "10%" }} >

        //     <Form >

        //         <Form.Group controlId="date">
        //             <Form.Label>Select Date</Form.Label>
        //             <Form.Control type="date"
        //                 onChange={e => setDate(e.target.value)}
        //                 placeholder="Date of posting" />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicTitle">
        //             <Form.Label>Title</Form.Label>
        //             <Form.Control type="text"
        //                 onChange={e => setTitle(e.target.value)}
        //                 name="title"
        //                 placeholder="Enter Title" />

        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicDesc">
        //             <Form.Label>Description</Form.Label>
        //             <Form.Control as="textarea" rows={3}

        //                 onChange={e => setDesc(e.target.value)}
        //             />
        //         </Form.Group>
        //         <Form.Group controlId="formFile" className="mb-3">
        //             <Form.Control type="file"

        //                 onChange={(e) => setImage(e.target.files[0])}

        //             />
        //         </Form.Group>
        //         {state?.user?.role === "admin" && (
        //             <Button variant="primary" type="submit"
        //                 onClick={(e) => mySubmitHandler(e)}
        //             >
        //                 Add Post
        //             </Button>
        //         )}
        //     </Form>


        // </div>

    );
}
}

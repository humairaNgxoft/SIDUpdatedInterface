import React, {
    Fragment, useRef,
    useContext, useEffect, useState
} from "react";
import { toast } from 'react-toastify'
import { Card, Button, Form, Container } from 'react-bootstrap';
import { AuthContext } from "../service/authentication";
import { api } from "../util/api";
import { Redirect } from "react-router-dom";
export const UpdatePost = (props) => {
    const { state } = useContext(AuthContext);

    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')

    const myUpdateSubmitHandler = async (e) => {
        const Id = props.id

        e.preventDefault()


        const formdata = new FormData();

        formdata.append("date", date);
        formdata.append('title', title);
        formdata.append('desc', desc);
        formdata.append('image', image);



        const response = await api.put(`/user/posts/${Id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                auth: state.token,
            },
        });

        if (response.data.success) {
            console.log("Post published successfully");

        } else {
            console.log(response.data.error.message);
        }
        window.location.reload();
        props.history.push("/displayPosts")

    }
    useEffect(() => {

        console.log(props.id, "id")
        // fetchPosts();
    }, []);


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
                                                    placeholder={props.date}
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
                                                    placeholder={props.title}
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
                                                    placeholder={props.image}
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
                                                    placeholder={props.desc}
                                                    required></textarea>
                                            </div>
                                        </div>


                                        <div className="text-center">
                                            <input type="submit"
                                                value="Update Post"
                                                onClick={(e) => myUpdateSubmitHandler(e)}
                                                className="btn btn-primary btn-block rounded-0 py-2" />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </div>


        );
    }
}


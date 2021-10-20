
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TableRow from "./TableRow"
import { Table } from 'react-bootstrap';
import { api } from "../util/api";
import { toast } from 'react-toastify'
import { Redirect } from "react-router-dom";
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { getAllDiscussionPosts, eletePost, getAllDiscussionComments } from "../util/user"
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../service/authentication";


export default function RequestPage() {

    const [requests, setRequests] = useState(
        [

        ]
    )


    const [messageComment, setMessageComment] = useState('')

    let history = useHistory();
    const [show, setShow] = useState(false);
    const [reply, setReply] = useState('')
    const [commentData, setCommentData] = useState([])

    const [activeItemId, setActiveItemId] = useState(0)
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const openModalWithItem = (item) => {
        setShow(true);
        setActiveItemId(item._id)
    }
    const submitComment = async (e, postID) => {

        e.preventDefault();

        const params =
        {

            postID,
            messageComment: messageComment,

        }
        console.log(params)
        const response = await api.post("/user/addComment", params, {
            headers: {
                "Content-Type": "application/json",
                auth: state.token,
            },
        }
        );

        if (response.data.success) {

            toast.success("your comment added to the discussion topic");
            window.location.reload();
            history.push("/requests");
        } else {
            toast.error("an Error " + response.data.error.message)

        }

    }


    const fetchComments = async () => {
        const response = await getAllDiscussionComments(state.token);
        console.log(response.data);
        if (response.data.comments) {
            setCommentData(response.data.comments)
        }
        console.log(commentData, "discussionTopic")


    };
    useEffect(() => {
        fetchComments();
        console.log(commentData, "comme")
    }, []);
    const getrequestsData = async () => {
        const response = await getAllDiscussionPosts();
        console.log(response, "????????????");
        if (response.data.posts) {
            setRequests(response.data.posts)
        }
    }
    console.log(requests)
    useEffect(() => {
        getrequestsData()

    }, [])

    // const tabRow = () => {

    //     requests.map((object, i) => {
    //         // console.log(object, "dss")
    //         return (<TableRow obj={object}
    //             // getrequestsData={getrequestsData}
    //             key={i} />);

    //     }
    //     )

    // }
    const { state } = useContext(AuthContext);

    if (!state.isAuthenticated ) {
        return <Redirect to="/" />;
    } else if (state.isAuthenticated ) {
        return (
            <div>
                <Container className="mainBox">

                    <div className="row justify-content-center"></div>
                    {/* <div className="container">
            <div className="row"> */}

                    <section className="content">
                        <h1>Requests</h1>
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-success btn-filter" data-target="pagado">Approve</button>
                                            <button type="button" className="btn btn-warning btn-filter" data-target="pendiente">Pending</button>
                                            <button type="button" className="btn btn-danger btn-filter" data-target="cancelado">Cancel</button>
                                            {/* <button type="button" className="btn btn-default btn-filter" data-target="all">Todos</button> */}
                                        </div>
                                    </div>
                                    <div className="table-container">

                                        <table className="table table-filter">

                                            <tbody >
                                                {requests?.length > 0 && requests?.map((req, i) => {
                                                    return (
                                                        <tr data-status="pagado" key={i} >
                                                            <td>
                                                                <div className="ckbox">
                                                                    <input type="checkbox"
                                                                    // defaultChecked={this.state.chkbox} 
                                                                    // onChange={this.handleChangeChk}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <a href="javascript:;" className="star">
                                                                    <i className="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>

                                                                <div className="media" onClick={() => openModalWithItem(req)} >
                                                                    {/* <a href="#" className="pull-left">
                                                                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" className="media-photo" />
                                                            </a> */}
                                                                    <div className="media-body">

                                                                        <h4 className="title">
                                                                            {req.username}
                                                                            <span className="pull-right pagado">(Approved)</span>
                                                                        </h4>
                                                                        <p className="summary">{req.query}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Modal

                            activeItemId={activeItemId}
                            show={show}
                            onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>admin reply</Modal.Title>


                            </Modal.Header>

                            <Modal.Body>
                                {commentData?.length > 0 && commentData?.filter(filtereddata => filtereddata.postID === activeItemId).map((msg) => {
                                    console.log(msg, "jjj")
                                    return <p>{msg.user.username}:{msg.messageComment}</p>
                                }
                                )}

                                <input type="text" className="form-control"
                                    id="comment"
                                    name="comment"
                                    onChange={e => setMessageComment(e.target.value)}
                                    placeholder="Enter your reply"
                                    required />

                                {/* <textarea
                                className="form-control"
                                // id="query"
                                rows="2"
                                onChange={e => console.log(e.target.value)}

                                onKeyDown={e => submitComment(e, activeItemId)}
                                placeholder="What are you thinking?"></textarea> */}
                                {/* 36302-5471989-3
issue date:27 9 2012 */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={e => submitComment(e, activeItemId)}>
                                    Send Reply
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </section>
                </Container>
            </div>






        );
    }
}

import React, {
    Fragment, useRef,
    useContext, useEffect, useState
} from "react";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../service/authentication";
import { api } from "../util/api";
import { getAllDiscussionPosts, deletePost, getAllDiscussionComments } from "../util/user"
// import { AiFillDelete,AiFillEdit } from "react-icons/ai";



export const MessageComments = (props) => {
    const [postsData, setPostsData] = useState([]);
    const [showHide, setShowHide] = useState(false)

    const [showHideComments, setShowHideComments] = useState(false)
    let history = useHistory();
    // const [date, setDate] = useState('')
    const [subject, setSubject] = useState('')
    // const [image, setImage] = useState('')
    const [selectedItem, setSelectedItem] = useState(0)
    const [query, setQuery] = useState('')
    const [messageComment, setMessageComment] = useState('')
    const [commentData, setCommentData] = useState([])



    const { state } = useContext(AuthContext);

    const showHideHandler = () => {
        setShowHide(!showHide)

    }
    const showHideCommetsHandler = () => {
        setShowHideComments(!showHideComments)
    }
    const fetchPosts = async () => {
        const response = await getAllDiscussionPosts();
        console.log(response.data.posts);
        if (response.data) {
            setPostsData(response.data.posts)
        }


    };

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


    // let temp = "";
    // if (props.title != undefined) {
    // temp = commentData?.filter(a => a.postID === postsData._id)
    // .map((comment) => {

    //     console.log(comment.messageComment, "jk")
    // })

    // console.log(temp, "yyyyyyyyyyyyyyyyyyyy")

    const EventHandlerClick = (i) => {
        setSelectedItem(i)
        setShowHide(!showHide)
    }

    const mySubmitHandler = async (e) => {

        e.preventDefault()


        const params =
        {
            query: query,
            subject: subject,
            // date: date,
        }
        console.log(params)
        const response = await api.post("/user/discussionsposts", params, {
            headers: {
                "Content-Type": "application/json",
                auth: state.token,
            },
        }
        );

        if (response.data.success) {
            toast.success("your discussion post has been added to discussion board")
            history.push("/reviews");
            window.location.reload();
        } else {
            toast.error("an error occured " + response.data.error.message);
        }

    }
    const handleSubmit = (e) => {
        console.log(e, "eeeeeeeeee")
    }
    const submitComment = async (e, postID) => {
        console.log(postID)

        console.log('enter press here! ')
        if (e.key === 'Enter') {

            const params =
            {
                messageComment: messageComment,
                postID
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
                toast.success("your comment added to the post successfully");
                window.location.reload();
                history.push("/reviews");
            } else {
                toast.error("error:" + response.data.error.message);
            }

        }

    }
    // if (!state.isAuthenticated) {
    //     return <Redirect to="/" />;
    // } else {
    useEffect(() => {
        // if (authContext.state.isAuthenticated) {
        fetchPosts();


        // }

    }, [selectedItem]);
    // if (!state.isAuthenticated) {
    //     return <Redirect to="/" />;
    // } else if (state.isAuthenticated) {
    return (

        <div className="container-fluid gedf-wrapper">
            <div className="row">
                <div className="col-md-3">

                </div>
                <div className="col-md-6 gedf-main">

                    {/* <!--- \\\\\\\Post--> */}
                    <div className="card gedf-card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <div className="h5 m-0">Add your Post here</div>
                                </li>

                            </ul>
                        </div>

                        <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                    <div className="form-group">


                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    {/* <div className="input-group-text"></div> */}
                                                </div>
                                                <input type="text" className="form-control"
                                                    id="subject"
                                                    name="subject"
                                                    onChange={e => setSubject(e.target.value)}
                                                    placeholder="Enter subject"
                                                    required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                // id="query"
                                                rows="3"
                                                onChange={e => setQuery(e.target.value)}
                                                placeholder="What are you thinking?"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                    <div className="form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile" />
                                            <label className="custom-file-label" for="customFile">Upload image</label>
                                        </div>
                                    </div>
                                    <div className="py-4"></div>
                                </div>
                            </div>
                            <div className="btn-toolbar justify-content-between">
                                <div className="btn-group">
                                    <button type="submit"
                                        onClick={(e) => mySubmitHandler(e)}
                                        className="btn btn-info border-radius-0  m-0 w-25">Share Your Post</button>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- Post /////--> */}

                    {/* <!--- \\\\\\\Post--> */}

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Lsit of User's Quries and discussion</h3>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">
                                {postsData?.length > 0 && postsData?.map((item, i) => {
                                    return (<>
                                        <div class="row toggle" key={i} data-toggle="detail-1">
                                            <div class="col-xs-10" onClick={() => EventHandlerClick(i)}>
                                                {item?.subject}
                                            </div>
                                            {/* <div class="col-xs-2" ><AiFillEdit /></div>
                                            <div class="col-xs-2"><AiFillDelete /></div> */}

                                        </div>
                                    </>)


                                })}
                                {console.log(postsData[selectedItem], postsData, selectedItem, "selected")}
                                {showHide && (<div id={selectedItem}>

                                    <hr></hr>
                                    <div class="container" >
                                        <div class="fluid-row">
                                            <div className="card gedf-card">
                                                <div className="card-header">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="mr-2">
                                                                <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                                                            </div>
                                                            <div className="ml-2">
                                                                <div className="h5 m-0">@ {postsData[selectedItem]?.user.username}</div>
                                                                {/* <div className="h7 text-muted">Miracles Lee Cross</div> */}
                                                            </div>
                                                        </div>
                                                        <div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="card-body">

                                                    <a className="card-link" href="#">
                                                    </a>

                                                    <p className="card-text">
                                                        {postsData[selectedItem]?.query}

                                                    </p>
                                                </div>


                                            </div>


                                            <div className="commentBox" >
                                                <ul className="list-unstyled">
                                                    {commentData?.length > 0 && commentData?.filter(filtereddata => filtereddata.postID === postsData[selectedItem]._id).map((msg) => {
                                                        return <li>
                                                            <span className="profileBox">{msg.user.username}</span>

                                                            <span className="profileText">
                                                                <p>{msg.messageComment}</p>




                                                            </span>

                                                        </li>
                                                    }
                                                    )}


                                                    {/* <li><span className="profileBox">M</span>
                                                        <span className="profileText">

                                                            <textarea
                                                                className="form-control"
                                                                // id="query"
                                                                rows="2"
                                                                onChange={e => setMessageComment(e.target.value)}

                                                                onKeyDown={e => submitComment(e, postsData[selectedItem]?._id)}
                                                                placeholder="What are you thinking?"></textarea>

                                                        </span>

                                                    </li> */}
                                                    <li><span class="profileText">   <textarea
                                                        className="form-control"
                                                        // id="query"
                                                        rows="2"
                                                        onChange={e => setMessageComment(e.target.value)}

                                                        onKeyDown={e => submitComment(e, postsData[selectedItem]?._id)}
                                                        placeholder="What are you thinking?"></textarea></span>
                                                        <span class="profileBox">{postsData[selectedItem]?.user.username}</span> </li>

                                                </ul>
                                            </div>
                                            <div id="div_id_username" className="form-group required">
                                                <div className="controls form-group d-flex w-100 ">

                                                </div>
                                            </div>


                                        </div>



                                    </div>
                                </div>

                                )}






                            </li>

                        </ul>
                    </div>
                    {/* {postsData.map(() => {
                        return (
                            <div>

                            </div>

                        )
                    })} */}

                    {/* <!-- Post /////--> */}


                    {/* <!--- \\\\\\\Post--> */}

                    {/* <!-- Post /////--> */}


                    {/* <!--- \\\\\\\Post--> */}


                    {/* <!-- Post /////--> */}



                </div>

            </div>
        </div>
    )
}
// }
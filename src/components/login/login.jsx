import React, { useContext, useState } from "react";
import loginImg from "../../login.svg";
import login from "../../log.svg";
import register from "../../register.svg";
import { signin } from "../../util/user";
import { AuthContext } from "../../service/authentication";
import { Redirect } from "react-router-dom";
// import { faFacebook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [isLogginActive, setIsLogginActive] = useState(true)
  const history = useHistory();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { containersRef } = props;
  const handleSubmit = async () => {
    const frmdetails = {
      email: email,
      password: password
    }

    const response = await signin(frmdetails);
    console.log(response, "response")
    if (response.data.success) {
      toast.success("user loggedin successfulyy")

      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
     setRedirect(true);
    } else {
      toast.error("Post added successfully in newsfeed", +response.data.error.message)

    }
  }


  if (redirect || authContext.state.isAuthenticated) {
    return (<Redirect to="/newsfeed" />);
  } else {
    return (
      // <div classNameName="base-containers" ref={containersRef}>
      //   <div classNameName="header">Login</div>
      //   <div classNameName="content">
      //     <div classNameName="image">
      //       <img src={loginImg} />
      //     </div>
      //     <div classNameName="form">
      //       <div classNameName="form-group">
      //         <label htmlFor="username">Email</label>
      //         <input type="text" name="email" placeholder="Email"
      //           value={email}
      //           onChange={e => setEmail(e.target.value)}
      //         />
      //       </div>
      //       <div classNameName="form-group">
      //         <label htmlFor="password">Password</label>
      //         <input type="password" name="password" placeholder="password"
      //           value={password}
      //           onChange={e => setPassword(e.target.value)}
      //         />
      //       </div>
      //     </div>
      //   </div>
      //   <div classNameName="footer">
      //     <button type="button" classNameName="btn"
      //       onClick={handleSubmit}
      //     >
      //       Login
      //     </button>
      //   </div>
      // </div>
      <div className="containers" >
        <div className="forms-containers">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">

                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="button" className="btn"
                onClick={handleSubmit}
              >
                Login
              </button>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />

                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <FontAwesomeIcon icon={faFacebookF} />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  {/* <i className="fab fa-facebook-f"></i> */}
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-containers" >
          <div className="panel left-panel" ref={props.containerRef}>
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn" >
                Sign up
              </button>
            </div>
            <img src={login} className="image" alt="" />
          </div>

        </div>
      </div>

    );
  }
};

export default Login
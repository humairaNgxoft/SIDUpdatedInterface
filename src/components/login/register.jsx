import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import login from "../../log.svg";
import register from "../../register.svg";
import loginImg from "../../login.svg";
import { api } from '../../util/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from 'react-toastify'
const Register = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const history = useHistory();



  const signup = async (e) => {
    console.log(e, "sdabj")

    let role;
    const params =
    {
      username: username,
      email: email,
      password: password,
      role: 'admin'
    }
    console.log(params)
    const response = await api.post("/user/signup", params, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    if (response.data.success) {
      toast.success("user registered successfulyy")
      history.push("/login");
    } else {
     
      toast.error("An error occured" +response.data.error.message);
    }

    console.log(response);
  }



  return (

    <div className="containers" >
      <div className="forms-containers">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">

              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
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
              <input type="text" name="username" placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
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

      <div className="panels-containers">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent"  id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={login} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>


  )
}

export default Register

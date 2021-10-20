import React from "react";
import "../../App.scss";
import Register from "./register";
import { Switch, Route } from "react-router-dom";
import { Navbar, NavbarBrand, Container, Link, Nav } from 'react-bootstrap'
import Login from "./login";

// import Login from "./components/login/login";
// import SimpleForm from "./chatbot/chatbot"

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount() {
    //Add .right by default
    // this.rightSide.classList.add("right");
    // this.container.classList.add("sign-up-mode");
    console.log(this.props,"kjfdks")
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (


      <>
        {/* <div className="login">
          <div className="container" ref={ref => (this.container = ref)}> */}

            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </>
          
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default Authentication;

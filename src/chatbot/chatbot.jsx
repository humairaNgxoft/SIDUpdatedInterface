import React, { Component, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { AuthContext } from "../service/authentication";
import { Redirect } from "react-router-dom";
import {
  Button, Offcanvas, Container, Col, Row, Form, InputGroup,
  FormControl, Image, Card,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';




export const Review = (props) => {
  let initialState = {
    name: '',
    gender: '',
    age: '',
  };

  const [state, setState] = useState(initialState)

  useEffect(() => {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    setState({ name, gender, age });
  }, []);



  const { name, gender, age } = state;

  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const SimpleForm = (props) => {
  const { state } = useContext(AuthContext);
  let history = useHistory();
  const PageTo = () => {
    history.push('/reviews')

  }

  // if (!state.isAuthenticated) {
  //   return <Redirect to="/" />;
  // } else if (state.isAuthenticated) {
  return (<div className="container-fluid gedf-wrapper" style={{ marginLeft: "27%" }}>
    <div className="row">
      {state?.user?.role === "user" && (<Col xs={2}> <Button variant="primary" onClick={() => PageTo()} >
        Add your Query Here
      </Button>
      </Col>)}

      <ChatBot className="chatbox"
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'valid', label: 'valid', trigger: '5' },
              { value: 'Invalid', label: 'Invalid', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'your message has been sent to admin',
            trigger: 'adminMsg',
          },
          {
            id: 'adminMsg',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (value) {
                return 'value must be a number';
              } else { return `${value}? Come on!`; }

            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    </div>
  </div>);
}

// }

export default SimpleForm;
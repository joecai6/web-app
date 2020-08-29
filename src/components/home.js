import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Header from './header';
import '../css/home.css';
import { Modal, Button, Form, Col} from 'react-bootstrap';

function Profile(props){
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if(props.user){
        setSchool(props.user.school);
        setMajor(props.user.major);
        setStart(props.user.start);
        setEnd(props.user.end);
    }
  }, [props.user])

  const postData = () => {
    let data = {
      school: school,
      major: major,
      start: start,
      end: end
    }
    axios.post('http://localhost:5000/users/update', data, {withCredentials: true}).then(res => {
      console.log(res.data);
    })
    props.handleClose(data);
  }

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>Update Information</Modal.Title>
          <Button variant="outline-secondary" onClick={props.handleClose}>&times;</Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>School</Form.Label>
              <Form.Control type="input" value={school} onChange={(e) => setSchool(e.target.value)}></Form.Control>
              <Form.Text>
                Look up your school through the autocomplete function.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Major</Form.Label>
              <Form.Control type="input" value={major}  onChange={(e) => setMajor(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Label>Start</Form.Label>
                <Form.Control type="input" value={start}  onChange={(e) => setStart(e.target.value)}></Form.Control>
              </Col>
              <Col>
                <Form.Label>End</Form.Label>
                <Form.Control type="input" value={end}  onChange={(e) => setEnd(e.target.value)}></Form.Control>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={postData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function Home(props){
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = (newData) => {
    setShow(false);
    let newState = data;
    for(const prop in newData){
      if(data[prop] !== newData[prop]){
        newState[prop] = newData[prop];
      }
    }
    setData(newState);
  }
  const handleShow = () => setShow(true);

  const getUser = () => {
    axios.get("http://localhost:5000/users/", {withCredentials: true}).then((res) => {
      setData(res.data);
      if(res.data.redirect === '/login'){
        props.history.push('/login');
      }
    });
  };
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Header />
      <div className="home-banner d-flex align-items-center p-5 justify-content-between mb-4">
        <div className="h3">Welcome to CourseMap!
          <div className="pt-3 h6">Map out and track through your plan.</div>
        </div>
      </div>
      <div className="row">
          <div className="home-panel col-7 ml-auto mb-5 shadow-lg">
            <div className="d-flex m-3">{data ? <h4>Hi, {data.firstname}!</h4> : null}
              <div className="h4 mx-5">Here is your profile.</div>
              <button className="btn btn-secondary my-0 ml-auto" onClick={handleShow}>
                Update
              </button>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col mb-2">
                  <div>{data ? <div><b>School:</b> {data.school}</div> : <div>not inputed</div>}</div>
                </div>
                <div className="col">
                  {data ? <div><b>Major:</b> {data.major}</div> : <div>not inputed</div>}
                </div>
                <div className="col-12 mb-2">
                  <div>{data ? <div><b>Current Year:</b> {new Date().toLocaleString()}</div> : <div>not inputed</div>}</div>
                </div>
                <div className="col-6 mb-2">
                  <div>{data ? <div><b>Start date:</b> {data.start}</div> : <div>not inputed</div>}</div>
                </div>
                <div className="col-6 mb-2">
                  <div>{data ? <div><b>Graduating In:</b> {data.end}</div> : <div>not inputed</div>}</div>
                </div>
                <div className="col-12">[PROGRESS BAR UNTIL GRADUATION]</div>
              </div>
            </div>
          </div>
          <div className="home-panel col-4 mx-auto shadow-lg">
            <div className="h4 m-3">Planner</div>
            <div className="">
              <div className="mb-2"><b>Last Updated:</b> {new Date().toLocaleString()}</div>
              <div className="mb-2"><b>Total Units:</b></div>
              <div className="mb-2"><b>GPA:</b></div>
              <div className="mb-2"><b>Units until graduation:</b></div>
            </div>
          </div>
      </div>
      <Profile show={show} handleClose={handleClose} user={data}/>
      <div className="home-info-window mb-5 bg-warning row p-0">
        <div className="col-6 bg-info info-background">
          <div className=""></div>
        </div>
        <div className="col-6 info-text-bg">
          <div className="m-5">
            <div className="mb-4 h4">What is CourseMap?</div>
            <div>
              CourseMap is a long term planner for college students to keep track of throughout their academic experience.
              Many students do not follow a four year academic plan, so CourseMap provides a platform for students to engage
              with their academic courses while being well aware of the path they forsake.<br></br><br></br>
              The goal of this app is to assist users in assuring that they will graduate on time and be prepared with
              the courses they will take next term. Coursemap is a convienent application that allow users to easily create
              a four year plan, instead of creating it by themselves through excel or downloading a template. There are many helpful features
              users can incorpate in forming their plan, such as downloading their plan into a printable pdf, autofilling their courses, etc.
              CourseMap also provides a progress bar to track the amount of units needed for graduation and the overall GPA.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import '../css/home.css';
import { Modal, Button, Form, Col} from 'react-bootstrap';

function ProfileModal(props){
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

export default ProfileModal;
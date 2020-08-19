import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

function Home(props){
  const [data, setData] = useState(null);

  const getUser = () => {
    axios.get("http://localhost:5000/users/", {withCredentials: true}).then((res) => {
      setData(res.data);
      if(res.data.redirect === '/login'){
        props.history.push('/login');
      }
      console.log(res.data);
    });
  };
  
  useEffect(() => {
    getUser();
  }, []);

  const handleLogOut = () => {
    axios.get("http://localhost:5000/users/logout", {withCredentials: true}).then((res) => {
      if(res.data.redirect === '/login'){
        props.history.push('/login');
      }
      console.log(res.data);
    });
  }

  return (
    <div>
      <div className="jumbotron">
        Home
      </div>
      <div>
        <div>{data ? <h1>Welcome Back {data.username}</h1> : null}</div>
      </div>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default withRouter(Home);
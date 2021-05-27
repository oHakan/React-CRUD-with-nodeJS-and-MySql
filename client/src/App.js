import React, { useState, useEffect} from "react";
import './index.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [totalreview, setTotalreview] = useState([])

  const [update, setUpdate] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response)=> {
      setTotalreview(response.data);
    })
  })

  const submitTest = () => {
    Axios.post("http://localhost:3001/api/insert", {name: name, degree: degree}).then(() => {
      alert("Succesfully!");
    });

    setTotalreview([
      ...totalreview,
      {name: name, degree:degree},
    ]);
  };

  const deleteTest = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`)
  };

  const updateTest = (name) => {
    Axios.put("http://localhost:3001/api/update", {
      name: name,
      degree: update,
    });
    setUpdate("")
  }

  return (
    <div className="App">
    <h1>Osman Hakan CRUD in React JS with Node JS</h1>
    <div className="Form">
    <label>Name</label>
    <input type="text" name="name" onChange={(e) => {setName(e.target.value)}}/>
    <label>Degree</label>
    <input type="text" name="degree"  onChange={(e) => {setDegree(e.target.value)}}/>
    <button onClick={submitTest}>Test it</button>

    {totalreview.map((val)=>{
      return (
        <div class="list">
         <h1> Name: {val.name} | Degree: {val.degree} </h1> <button onClick={() => {deleteTest(val.name);}}>Delete</button>
         <input type="text" name="update" onChange={(e) => {
              setUpdate(e.target.value)
         }}/>
         <button onClick={() => {updateTest(val.name)}}>Update Test</button>
         </div>
      );
    })}

    </div>
    </div>
  );
}

export default App;

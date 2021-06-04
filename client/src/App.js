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

  useEffect(() => {
    Axios.get('http://localhost:3001/giris').then((response) => {
      setTotalreview(response.data);
    })
  })

  const submitTest = () => {
    Axios.post("http://localhost:3001/api/insert", {name: name, degree: degree}).then(function(response) {
     
    });

    setTotalreview([
      ...totalreview,
      {name: name, degree:degree},
    ]);
  };

  const deleteTest = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
  };

  const updateTest = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
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
         <h1> ID: {val.id} | Name: {val.name} | Degree: {val.degree} </h1> <button onClick={() => {deleteTest(val.id);}}>Delete</button>
         <input type="text" name="update" onChange={(e) => {
              setUpdate(e.target.value)
         }}/>
         <button onClick={() => {updateTest(val.id)}}>Update Test</button>
         <h1></h1>
         </div>
        
      );
    })}

    </div>
    </div>
  );
}

export default App;

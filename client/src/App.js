import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios"
function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [listOfData, setListOfData] = useState([]);

  const adddata = () => {
    Axios.post("http://localhost:3001/insert", { name: name, id: id }).then(() => {
      setListOfData([...listOfData, { name: name, id: id }]);
    }).catch((err) => {
      alert("Opps,It Didn't worked like her reply" + err);
    })
  }

  const del = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }


  const updated = (id) => {
    const newname = prompt("Enter Name");

    Axios.put("http://localhost:3001/update", { newname: newname, id: id }).then(() => {
      setListOfData(listOfData.map((val) => {
        return val._id === id ? { _id: id, name: newname, id: val.id } : val
      })
      )
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setListOfData(response.data);
      // const updt = prompt("Enter Name");
      // console.log(updt);
    }).catch((err) => {
      alert(err);
    })
  }, [])


  return (
    <div className="App">
      <input type="text" placeholder='NAME' onChange={(event) => {
        setName(event.target.value);
      }}></input>
      <input type="number" placeholder='ID' onChange={(event) => {
        setId(event.target.value);
      }}></input>
      <button onClick={adddata}>Add</button>
      {listOfData.map((val) => {
        return (
          <div>
            {""}
            {val.name} {val.id}
            <button onClick={() => { updated(val._id) }}>UPDATE</button>
            <button onClick={() => {
              del(val._id);
            }}
            >DELETE</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;

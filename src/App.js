// https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getList, setItem } from './services/list';

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);
  // The useRef Hook will preserve a variable for the lifetime of the component
  const mounted = useRef(true);
  // let mounted = true;
  
  // Hiding alert after 1 second
  // useEffect(() => {
  //   if(alert) {
  //     setTimeout(() => {
  //       setAlert(false);
  //     }, 1000)
  //   }
  // }, [alert])

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        if(mounted) {
          setAlert(false);
        }
      }, 1000)
    }
  }, [alert])

  // Updating list by using alert and lists arrray
  useEffect(() => {
    // let mounted = true;
    mounted.current = true;
    if(list.length && !alert) {
      return;
    }
    getList()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted.current = false;
    // return () => mounted = false;
  }, [alert, list])

  // useEffect(() => {
  //   // let mounted = true;
  //   getList()
  //     .then(items => {
  //       if(mounted) {
  //         setList(items)
  //       }
  //     })
  //   // return () => mounted = false;
  //   return () => mounted.current = false;
  // }, [])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setItem(itemInput)
  //   .then(() => {
  //     setItemInput('');
  //     setAlert(true);
  //   })
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput)
      .then(() => {
        if(mounted.current) {
          setItemInput('');
          setAlert(true);
        }
      })
  };

  return(
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
       {list.map(item => <li key={item.item}>{item.item}</li>)}
     </ul>
     {alert && <h2> Submit Successful</h2>}
     <form onSubmit={handleSubmit}>       
        <label>
         <p>New Item</p>
         <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput} />       
      </label>
       <button type="submit">Submit</button>
     </form>
   </div>
  )
}

export default App;
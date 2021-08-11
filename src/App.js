import "./styles.css";
import { useState } from "react";

export default function App() {
  var [date, setDate] = useState("");
  var [message, setMessage] = useState("");

  function handleChange(event) {
    setDate(event.target.value);
  }

  function handleClick(date) {
    if (date === "") {
      setMessage("Please enter the date.");
    } else {
      setMessage("The date entered is " + date);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Birthday Palindrome</h1>
        <h2>Check if your birthday is a palindrome...</h2>
      </div>

      <div className="main">
        <input type="date" onChange={() => handleChange(event)}></input>
        <button className="btn" onClick={() => handleClick(date)}>
          Check
        </button>

        <h2>{message}</h2>
      </div>
    </div>
  );
}

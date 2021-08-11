import "./styles.css";
import { useState } from "react";

export default function App() {
  var [date, setDate] = useState("");
  var [message, setMessage] = useState("");

  function handleChange(event) {
    setDate(event.target.value);
  }

  function getSplitDate(date) {
    var splitDate = date.split("-");
    var dateAsString = {
      day: splitDate[2],
      month: splitDate[1],
      year: splitDate[0]
    };
    //return date in ddmmyyyy format
    return dateAsString;
  }

  function handleClick(date) {
    if (date === "") {
      setMessage("Please enter the date.");
    }
    // Main logic here...
    else {
      // Convert the date into ddmmyyyy format
      // first split it into 3 parts
      var dateStr = getSplitDate(date);
      console.log(dateStr);
      setMessage("The date entered is ");
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

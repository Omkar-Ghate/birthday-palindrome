import "./styles.css";
import { useState } from "react";
import happyBirthday from "./happyBirthday.svg";
import linkedIn from "./linkedIn.png";
import twitter from "./twitter.png";
import github from "./github.png";
import briefcase from "./briefcase.png";
export default function App() {
  var [date, setDate] = useState("");
  var [message, setMessage] = useState("Your result will be shown here");

  var [show, setShow] = useState("none");

  // handles the change in date input field
  function handleChange(event) {
    setDate(event.target.value);
  }

  // handles the check button click
  function handleClick(date) {
    if (date === "") {
      setMessage("Please enter the date.");
    }
    // Main logic here...
    else {
      // first split it into 3 parts
      var dateSplit = getSplitDate(date);
      date = {
        day: Number(dateSplit.day),
        month: Number(dateSplit.month),
        year: Number(dateSplit.year)
      };
      // convert it into string format
      var dateStr = getDateAsString(date);

      //returns an object date = {day: "", month: "", year: ""}
      console.log(date);
      console.log(dateStr);

      var nextPalindromeDate = getNextPalindromeDate(dateStr)[1];
      var daysInBetween = getNextPalindromeDate(dateStr)[0];

      if (checkPalindromeForAllDateFormats(dateStr).toString() === "true") {
        setMessage("Whoa! Your birthdate is a palindrome.");
      } else if (
        checkPalindromeForAllDateFormats(dateStr).toString() === "false"
      ) {
        setMessage(
          "Awww! Your birthdate is not palindrome. Nearest palindrome date is " +
            nextPalindromeDate.year +
            "-" +
            nextPalindromeDate.month +
            "-" +
            nextPalindromeDate.day +
            ". You missed it by " +
            daysInBetween +
            " days."
        );
      }
    }
  }

  // Function to handle click on how does this work button
  function handleHowBtnClick() {
    var showStyle = show === "none" ? "block" : "none";
    setShow(showStyle);
  }
  /* 
  ### Helper Functions ###
  */

  // reverse the string
  function reverseStr(str) {
    var strReverse = str.split("").reverse().join("");
    return strReverse;
  }

  // check if string is palindrome
  function checkPalindrome(str) {
    return reverseStr(str) === str;
  }

  // split the yyyymmdd into dd, mm, yyyy format
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

  // get date in string format
  function getDateAsString(date) {
    var dateAsString = { day: "", month: "", year: "" };

    dateAsString.year = date.year.toString();

    if (date.day < 10) {
      dateAsString.day = "0" + date.day;
    } else {
      dateAsString.day = date.day.toString();
    }

    if (date.month < 10) {
      dateAsString.month = "0" + date.month;
    } else {
      dateAsString.month = date.month.toString();
    }
    //console.log(dateAsString);
    return dateAsString;
  }

  // returns an object having date in all 6 string formats
  function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

  // check if the string is a palindrome in at least one of the 6 formats
  function checkPalindromeForAllDateFormats(date) {
    var dateInAllFormats = getDateInAllFormats(date);
    var flag = false;
    for (var i = 0; i < dateInAllFormats.length; i++) {
      if (checkPalindrome(dateInAllFormats[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  // Check for leap year
  function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
  }

  // Calculate the next date
  function getNextDate(date) {
    var day = date.day + 1; // increment the current date
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If it's Feb
    if (month === 2) {
      // if it's a leap year
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      }

      // if it's not a leap year
      else {
        if (day > 28) day = 1;
        month++;
      }
    }

    // For other months
    else {
      // if day exceeds the max no. of days in the month
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
    // months exceeds 12
    if (month > 12) {
      month = 1;
      year++;
    }

    // return the newly incremented date
    return {
      day: day,
      month: month,
      year: year
    };
  }

  // Find the next palindrome date
  function getNextPalindromeDate(date) {
    var cntr = 0;
    var nextDate = getNextDate(date);
    while (true) {
      cntr++; // to count the number of days b/w current and next palindrome
      var dateStr = getDateAsString(nextDate);
      var isPalindrome = checkPalindromeForAllDateFormats(dateStr);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate); // increment the date
    }

    return [cntr, nextDate];
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Birthday Palindrome</h1>
      </div>
      <div class="intro-wrapper">
        <div class="dots-wrapper">
          <div id="dot-1" class="browser-dot"></div>
          <div id="dot-2" class="browser-dot"></div>
          <div id="dot-3" class="browser-dot"></div>
        </div>
        <div className="innerDiv">
          <div className="header">
            <h2>
              Check if your <span>Birthday</span> is a <span>Palindrome</span>
              ...
            </h2>
            <p>
              A palindrome is a word/number which reads the same backward as
              forward
            </p>
            <a href="#main">Try it</a>
          </div>
          <div className="headerImg">
            <img src={happyBirthday} width="100%" height="80%"></img>
          </div>
        </div>
      </div>
      <div id="main">
        <h1>
          Enter your birthdate and we will tell you <br></br>if it's a
          palindrome
        </h1>
        <div className="description">
          <button className="btn" onClick={handleHowBtnClick}>
            How does this work?
          </button>
          <p style={{ display: `${show}` }}>
            This app checks your birthdate in 6 formats dd-mm-yyyy, mm-dd-yy,
            yyyy-mm-dd, mm-dd-yy, dd-mm-yy, yy-mm-dd. <br></br>
            If your birthdate is 01 Aug 1995, then app will check for 01081995,
            08011995, 19950801, 080195, 010895, and 950801.
          </p>
        </div>

        <input type="date" onChange={() => handleChange(event)}></input>
        <button className="btn" onClick={() => handleClick(date)}>
          Check
        </button>
        <div className="output">
          <h2>{message}</h2>
        </div>
      </div>

      {/* <footer>
        <div className="creator">
          Made with <strong>&lt;/&gt;</strong> by Omkar Ghate
        </div>
        <ul>
          <li className="footerLink">
            <a href="https://github.com/Omkar-Ghate" target="blank">
              <img className="socialIcon" src={github}></img>
            </a>
          </li>
          <li className="footerLink">
            <a href="https://twitter.com/OmkarGhate9" target="blank">
              <img className="socialIcon" src={twitter}></img>
            </a>
          </li>
          <li className="footerLink">
            <a href="https://www.linkedin.com/in/omkarghate/" target="blank">
              <img className="socialIcon" src={linkedIn}></img>
            </a>
          </li>
          <li className="footerLink">
            <a href="https://omkarghate.netlify.app/" target="blank">
              <img className="socialIcon" src={briefcase}></img>
            </a>
          </li>
        </ul>
      </footer> */}
    </div>
  );
}

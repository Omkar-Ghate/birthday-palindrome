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
      // console.log(date);
      // console.log(dateStr);

      // var nextPalindromeDate = getNextPalindromeDate(dateStr)[1];
      // var daysInBetween1 = getNextPalindromeDate(dateStr)[0];
      // var prevPalindromeDate = getPrevPalindromeDate(dateStr)[1];
      // var daysInBetween2 = getPrevPalindromeDate(dateStr)[0];
      // console.log(daysInBetween1, daysInBetween2);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;

      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }

      if (isPalindrome === true) {
        setMessage("Whoa! Your birthdate is a palindrome.");
      } else {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, prevDate] = getPrevPalindromeDate(date);
        setMessage(
          "Awww! Your birthdate is not palindrome. Nearest palindrome date is " +
            (ctr1 < ctr2
              ? nextDate.day +
                "-" +
                nextDate.month +
                "-" +
                nextDate.year +
                ". You missed it by " +
                ctr1 +
                " days."
              : prevDate.day +
                "-" +
                prevDate.month +
                "-" +
                prevDate.year +
                ". You missed it by " +
                ctr2 +
                " days.")
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
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
      var result = checkPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
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
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }

  // Find the next palindrome date
  function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
      ctr++;
      var dateStr = getDateAsString(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);

      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  // Calculate the previous date
  function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
      month--;

      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }
  // Find the previous palindrome date
  function getPrevPalindromeDate(date) {
    var previousDate = getPrevDate(date);
    var ctr = 0;

    while (1) {
      ctr++;
      var dateStr = getDateAsString(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);

      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPrevDate(previousDate);
    }
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
            <img src={happyBirthday}></img>
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

      <footer>
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
      </footer>
    </div>
  );
}

import "./styles.css";

export default function App() {
  function handleClick() {
    console.log("Clicked");
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Birthday Palindrome</h1>
        <h2>Check if your birthday is a palindrome...</h2>
      </div>

      <div className="main">
        <input type="date" required></input>
        <button className="btn" onClick={handleClick}>
          Check
        </button>
      </div>
    </div>
  );
}

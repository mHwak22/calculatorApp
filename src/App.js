// on top default/ third party libraries
import React, { useEffect, useState } from 'react';

// Components
import Display from './Components/Display/Display';
import NumPad from './Components/NumPad/NumPad';

// images or assets
import Dark from './assets/moon.png';
import Light from './assets/sun.png';

//css
import './App.css';
// 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 107, 109, 56, 111, 187, 190
const inUseKeyCodes = [48, 49, 50, 51, 51, 52, 53, 54, 55, 56, 57, 96, 98, 99,
  100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const operators = ["-", "+", "*", "/"];

function App() {

  const [isDarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false)
  // const [isDarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false)
  const [isExpression, setExpression] = useState("");
  const [isResult, setResult] = useState("");
  const [isHistory, setHistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || [])
  // const [isHistory, setHistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || [])

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;

    if (!inUseKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      /*checking that number 0(zero) is enter first if it is then not accepting it 
      else appending it with expression */
      if (key === "0") {
        if (isExpression.length === 0) return;
      }
      calculateResult(isExpression + key);
      setExpression(isExpression + key)
      console.log("expression =" + isExpression)
    }

    else if (operators.includes(key)) {
      /*checking that operator is enter first if it is then not accepting it 
      else appending it with expression */
      if (!isExpression) return;

      const lastChar = isExpression.slice(-1);
      //slice function to get the character from expression(-1)
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(isExpression + key)

      console.log("expression =" + isExpression)
    }
    else if (key === ".") {
      if (!isExpression) return;
      const lastChar = isExpression.slice(-1)
      if (!numbers.includes(lastChar)) return;

      setExpression(isExpression + key)
      console.log("expression =" + isExpression)
    }

    else if (keyCode === 8) {
      if (!isExpression) return;

      //using slice fun to remove last entered value in backspace
      calculateResult(isExpression.slice(0, -1));
      setExpression(isExpression.slice(0, -1))
      console.log("expression =" + isExpression)
    }

    else if (keyCode === 13 || keyCode === 187) {
      if (!isExpression) return
      calculateResult(isExpression)
      const tempHistory = [...isHistory]
      if (isHistory.length > 20) {
        tempHistory = tempHistory.splice(0, 1);
      }

      tempHistory.push(isExpression)
      setHistory(tempHistory)
      console.log("expression =" + isExpression)
    }
  }

  const calculateResult = (exp) => {
    if (!exp) {
      setResult(" ")
      return
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) {
      exp = exp.slice(0, -1);
    }
    const ans = eval(exp).toFixed(2) + " ";
    setResult(ans);
  }


  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(isHistory))
  }, [isHistory])

  return (
    <div className="app"
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      data-theme={isDarkMode ? "dark" : " "}>
      <div className='app_calculator'>
        <div className='app_calculator_navbar'>
          <div className='app_calculator_navbar_toggle'
            onClick={() => setDarkMode(!isDarkMode)}>
            <div className={`app_calculator_navbar_toggle_circle 
            ${isDarkMode ? "app_calculator_navbar_toggle_circle_active" : " "}`} />
          </div>
          <img src={isDarkMode ? Dark : Light} alt='mode' />
        </div>


        <Display expression={isExpression} result={isResult} history={isHistory} />

        <NumPad handleKeyPress={handleKeyPress} />

      </div>
    </div>
  );
}

export default App;

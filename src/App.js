import { useState } from "react";

import Display from "./components/Display";
import Digit from "./components/Digit";
import Operator from "./components/Operator";
import Clear from "./components/Clear";
import Equals from "./components/Equals";
import DecimalPoint from "./components/DecimalPoint";

import { digits, operators } from "./data";

function App() {

  // state

  const initialCalculationState = {
    operandLeft: 0,
    operator: null,
    operandRight: null,
  };

  const [display, setDisplay] = useState(() => '0');

  const [calculation, setCalculation] = useState(() => initialCalculationState);

  // eventHandlers

  const handleClearClick = () => {
    setDisplay(0);
    setCalculation(initialCalculationState);
  };

  const handleDigitClick = (e) => {    
    const newInput = e.target.innerText;
    setDisplay((prevDisplay) => {
      if (prevDisplay == 0) {
        return newInput;
      } else {
        return prevDisplay + newInput;
      }
    });
  }

  const handleDecimalClick = () => {
    setDisplay((prevDisplay) => prevDisplay.includes('.') ? prevDisplay : prevDisplay + '.');
  }

  // rendering

  const digitsToRender = digits.map(digit =>
    <Digit
      key={digit.id}
      id={digit.id}
      value={digit.value}
      style = {{gridArea: digit.id}}
      clickHandler = {handleDigitClick}
      />
  );
  const operatorsToRender = operators.map(operator =>
    <Operator
      key={operator.id}
      id={operator.id}
      value={operator.value}
      style = {{gridArea: operator.id}}
    />
  );
  return (
    <div className="App">
      <Display
        value={display}
      />
      {digitsToRender}
      {operatorsToRender}
      <Clear
        id='clear'
        value='C'
        style={{gridArea: 'clear'}}
        clickHandler={handleClearClick}
      />
      <DecimalPoint
        id='decimal'
        value='.'
        style={{gridArea: 'decimal'}}
        clickHandler={handleDecimalClick}
      />
      <Equals
        id='equals'
        value='='
        style={{gridArea: 'equals'}}
      />
    </div>
  );
};

export default App;

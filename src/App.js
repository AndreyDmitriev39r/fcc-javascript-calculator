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

  const [display, setDisplay] = useState(() => 0)

  const [calculation, setCalculation] = useState(() => ({
    operandLeft: 0,
    operator: null,
    operandRight: null,
  }))

  // eventHandlers

  const handleClearClick = () => {
    setDisplay(0);
  }

  const handleNumberClick = (e) => {    
    const newInput = e.target.innerText;
    setDisplay((prevDisplay) => {
      if (prevDisplay == 0) {
        return newInput;
      } else {
        return prevDisplay + newInput;
      }
    });
  }
  // rendering

  const digitsToRender = digits.map(digit =>
    <Digit
      key={digit.id}
      id={digit.id}
      value={digit.value}
      style = {{gridArea: digit.id}}
      clickHandler = {handleNumberClick}
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
      />
      <Equals
        id='equals'
        value='='
        style={{gridArea: 'equals'}}
      />
    </div>
  );
}

export default App;

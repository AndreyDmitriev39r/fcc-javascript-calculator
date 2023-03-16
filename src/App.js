import { useState } from "react";

import Display from "./components/Display";
import Digit from "./components/Digit";
import Operator from "./components/Operator";
import Clear from "./components/Clear";
import Equals from "./components/Equals";
import DecimalPoint from "./components/DecimalPoint";

import { digits, operators } from "./data";

function App() {

  // TODOs

  // add formula component
  // fix: display and calculation states connection should be refactored
    // on clicks => set calculations first, based on that => setDisplay
    // as an option - consider useEffect for dispaly with calculation dependency

  const operatorsLookup = {};
  operators.forEach(operator => operatorsLookup[operator.id] = operator.operation);  

  // state

  const initialCalculationState = {
    operandLeft: 0,
    operator: null,
    operandRight: null,
    isDecimalPoint: false,
  };

  const [display, setDisplay] = useState(() => '0');

  const [calculation, setCalculation] = useState(() => initialCalculationState);

  // eventHandlers

  const handleClearClick = () => {
    setDisplay(0);
    setCalculation(initialCalculationState);
  };

  const handleDigitClick = (event) => {    
    const newInput = event.target.innerText;
    setDisplay((prevDisplay) => {
      if (prevDisplay == 0) {
        return newInput;
      } else {
        return prevDisplay + newInput;
      }
    });
    setCalculation((prevCalculation) => {
      //case no new operator is chosen yet
      if (!prevCalculation.operator) {        
        return {
          ...prevCalculation,
          operandLeft: !prevCalculation.isDecimalPoint
            ? Number(prevCalculation.operandLeft + newInput)
            : Number(prevCalculation.operandLeft + "." + newInput),
          isDecimalPoint: prevCalculation.isDecimalPoint
            ? !prevCalculation.isDecimalPoint
            : prevCalculation.isDecimalPoint
        } 
      } else {
      //case operator is chosen       
        return {
          ...prevCalculation,
          operandRight: !prevCalculation.isDecimalPoint
            ? Number(Number(prevCalculation.operandRight) + newInput)
            : Number(Number(prevCalculation.operandRight) + "." + newInput),
          isDecimalPoint: prevCalculation.isDecimalPoint
            ? !prevCalculation.isDecimalPoint
            : prevCalculation.isDecimalPoint
        }
      }   
    });
  }

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay((prevDisplay) => prevDisplay + '.');
      setCalculation((prevCalculation) => {               
          return {...prevCalculation, isDecimalPoint: true}           
      });
    }   
  };

  const handleOperatorClick = (event) => {
    const currentOperation = event.target.id;
    setCalculation((prevCalculation) => {
      // case no right operand is present
      if (!prevCalculation.operandRight) {             
        return {...prevCalculation,
          operator: operatorsLookup[currentOperation],
          isDecimalPoint: false}
      }
    })
  }

  const handleEqualsClick = (event) => {
    console.log(event.target);
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
      clickHandler = {handleOperatorClick}
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
        clickHandler={handleEqualsClick}
      />
    </div>
  );
};

export default App;

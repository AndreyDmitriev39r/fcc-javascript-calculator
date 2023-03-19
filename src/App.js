import { useState } from "react";

import Formula from "./components/Formula";
import Display from "./components/Display";
import Button from "./components/Button";

import buttons from "./data";

function App() {

  // state

  const initialCalculationState = {
    operandLeft: 0,
    operator: null,
    operandRight: null,
    lastPressedDecimal: false, 
  };

  const [display, setDisplay] = useState(() => '0');

  const [formula, setFormula] = useState(() => '0');

  const [isDecimal, setIsDecimal] = useState(() => false);

  const [calculation, setCalculation] = useState(() => initialCalculationState);

  // eventHandlers

  const handleClearClick = (event) => {    
    setDisplay('0');
    setFormula('0');
    setCalculation(initialCalculationState);
    setIsDecimal(false);
  };

  const handleDigitClick = (event, value) => {      
    if (!calculation.operator) {      
      if (calculation.operandLeft === 0) {
        setCalculation(prevCalculation => ({
          ...prevCalculation, operandLeft: value
        }));
        setDisplay(value);
        setFormula(prevFormula => prevFormula == 0 ? value : prevFormula + value);
      } else {
        setCalculation(prevCalculation => ({
          ...prevCalculation, operandLeft: Number(prevCalculation.operandLeft + event.target.innerText)
        }));
        setDisplay(prevDisplay => prevDisplay + event.target.innerText);
        setFormula(prevFormula => prevFormula + event.target.innerText);
      }
    } else {
      if (calculation.operandRight === 0) {
        setCalculation(prevCalculation => ({
          ...prevCalculation, operandRight: value
        }));
        setDisplay(value);
        setFormula(prevFormula => prevFormula + value);
      } else {
        setCalculation(prevCalculation => ({
          ...prevCalculation, operandRight: Number(prevCalculation.operandRight + event.target.innerText)
        }));
        setDisplay(prevDisplay => prevDisplay + event.target.innerText);
        setFormula(prevFormula => prevFormula + event.target.innerText);
      }
    }    
  };

  const handleDecimalClick = (event) => {    
    if (isDecimal) return;
    setDisplay(prevDisplay => prevDisplay + '.')
    setIsDecimal(true);
  };

  const handleOperatorClick = (event, value, operation) => {
    let result;
    if (!calculation.operandRight)  {
      setCalculation(prevCalculation => ({
        ...prevCalculation, operator: operation, operandRight: 0
      }));
      setFormula(prevFormula => !calculation.operator ? prevFormula + event.target.innerText : prevFormula.slice(0, -1) + event.target.innerText);
      setIsDecimal(false);
    } else {
      let {operandLeft, operator, operandRight} = calculation;
      result = Number(operator(operandLeft, operandRight).toPrecision(4));  
      setCalculation(prevCalculation => ({
        ...initialCalculationState, operandLeft: result, operator: operation, operandRight: 0
      }));
      setFormula(prevFormula => prevFormula + '=' + result + event.target.innerText);
      setDisplay(result);
      setIsDecimal(false);
    }
  };

  const handleEqualsClick = () => {
    if (!calculation.operator) return;
    let result;
    if (calculation.operator && calculation.operandRight) {
      let {operandLeft, operator, operandRight} = calculation;
      result = Number(operator(operandLeft, operandRight).toPrecision(4));      
    } else if (calculation.operator) {
      let {operandLeft, operator} = calculation;
      result = Number(operator(operandLeft, operandLeft).toPrecision(4));     
    }
    setCalculation({...initialCalculationState, operandLeft: result});
    setDisplay(result);
    setFormula(prevFormula => prevFormula + '=' + result);
    setIsDecimal(false);
  };

  // rendering

  const buttonsToRender = buttons.map(button =>
    <Button
      key={button.id}
      id={button.id}
      value={button.value}
      operation={button.operation}
      clickHandler={
        button.operation ? handleOperatorClick
          : button.id === 'clear' ? handleClearClick
          : button.id === 'equals' ? handleEqualsClick
          : button.id === 'decimal' ? handleDecimalClick
          : handleDigitClick
      }
      style={{gridArea: button.id}}
    />
  );
  
  return (
    <div className="App">
      <Formula value={formula} />
      <Display value={display} />
      {buttonsToRender}      
    </div>
  );
};

export default App;

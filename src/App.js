import { useState } from "react";

import Formula from "./components/Formula";
import Display from "./components/Display";
import Button from "./components/Button";

import buttons from "./data";

function App() {

  // TODOs
    // primary      
      // think through logic for handling decimal point
      // think through '-' operator edge case
    // secondary
      // make formula to have fixed length
      // think through possibility of putting equals functionality in the same function as operator's functionality
      // consider utility for result calculation
      // readability: some long lines should be splitted

  // state

  const initialCalculationState = {
    operandLeft: 0,
    operator: null,
    operandRight: null,
    isLastPressedDecimal: false,
    isRightOperandNegative: false,
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
    const operandToUpdate = !calculation.operator
      ? 'operandLeft'
      : 'operandRight';
    const [newValue , updateOrder] = calculation[operandToUpdate] === 0
      ? [value, false]
      : [event.target.innerText, true];
    setCalculation(prevCalculation => ({
      ...prevCalculation,
      [operandToUpdate]: !updateOrder
        ? newValue
        : Number(prevCalculation[operandToUpdate] + newValue)
    }));
    setDisplay(prevDisplay => !updateOrder ? newValue : prevDisplay + newValue);
    setFormula(prevFormula => {
      if (!updateOrder) {
        return prevFormula == 0 ? value : prevFormula + value;
      } else {
        return prevFormula + newValue;
      }
    });
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
      setCalculation({...initialCalculationState, operandLeft: result, operator: operation, operandRight: 0});
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

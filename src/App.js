import { useState } from "react";

import Formula from "./components/Formula";
import Display from "./components/Display";
import Button from "./components/Button";

import buttons from "./data";

function App() {

  // TODOs
    // primary
      // implement functionality for decimal numbers 
    // secondary
      // make formula to have fixed length
      // think through possibility of putting equals functionality in the same function as operator's functionality
      // consider utility for result calculation  

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

  const [calculation, setCalculation] = useState(() => initialCalculationState);

  // eventHandlers

  const handleClearClick = (event) => {    
    setDisplay('0');
    setFormula('0');
    setCalculation(initialCalculationState);
  };

  const handleDigitClick = (event, value) => {
    const operandToUpdate = !calculation.operator
      ? 'operandLeft'
      : 'operandRight';
    let [newValue , updateOrder] = calculation[operandToUpdate] === 0
      ? [value, false]
      : [event.target.innerText, true];
    newValue = calculation.isRightOperandNegative ? -newValue : value;
    setCalculation(prevCalculation => ({
      ...prevCalculation,
      [operandToUpdate]: !updateOrder
        ? newValue
        : Number(prevCalculation[operandToUpdate] + newValue),
      isRightOperandNegative: false,
    }));
    setDisplay(prevDisplay => !updateOrder ? String(newValue) : String(prevDisplay + newValue));
    setFormula(prevFormula => {
      if (!updateOrder) {
        return prevFormula == 0 ? String(value) : String(prevFormula + value);
      } else {
        return prevFormula + newValue;
      }
    });
  };

  const handleDecimalClick = (event) => {
    console.log(event.target);
  };

  const handleOperatorClick = (event, value, operation) => {
    let result;
    
    if (!calculation.operandRight)  {      
      if (calculation.operator && event.target.id === 'subtract') {
        setCalculation(prevCalculation => ({...prevCalculation, isRightOperandNegative: true}));        
        return;
      }
      setCalculation(prevCalculation => ({
        ...prevCalculation,
        operator: operation,
        operandRight: 0,
        isRightOperandNegative: false,
      }));
      setFormula(prevFormula => !calculation.operator
        ? prevFormula + event.target.innerText
        : prevFormula.slice(0, -1) + event.target.innerText
      );    
    } else {     
      let {operandLeft, operator, operandRight} = calculation;
      result = Number(operator(operandLeft, operandRight).toPrecision(4));  
      setCalculation({
        ...initialCalculationState,
        operandLeft: result,
        operator: operation,
        operandRight: 0});
      setFormula(prevFormula => prevFormula + '=' + result + event.target.innerText);
      setDisplay(result);      
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

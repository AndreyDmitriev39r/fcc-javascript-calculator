import { useState } from "react";

import Formula from "./components/Formula";
import Display from "./components/Display";
import Button from "./components/Button";

import buttons from "./data";

function App() {

  // TODOs

  // fix: display and calculation states connection should be refactored
    // on clicks => set calculations first, based on that => setDisplay   

  // state

  const initialCalculationState = {
    operandLeft: 0,
    operator: null,
    operandRight: null,
    isDecimalPoint: false,
  };

  const [display, setDisplay] = useState(() => '0');

  const [formula, setFormula] = useState(() => '0'.repeat(1));

  const [calculation, setCalculation] = useState(() => initialCalculationState);

  // eventHandlers

  const handleClearClick = (event) => {
    // setDisplay(0);
    // setCalculation(initialCalculationState);
    console.log(`${event.target} is clicked`)
  };

  const handleDigitClick = (event) => {
    console.log(`${event.target} is clicked`)     
    // const newInput = event.target.innerText;
    // setDisplay((prevDisplay) => {
    //   if (prevDisplay == 0) {
    //     return newInput;
    //   } else {
    //     return prevDisplay + newInput;
    //   }
    // });
    // setCalculation((prevCalculation) => {
    //   //case no new operator is chosen yet
    //   if (!prevCalculation.operator) {        
    //     return {
    //       ...prevCalculation,
    //       operandLeft: !prevCalculation.isDecimalPoint
    //         ? Number(prevCalculation.operandLeft + newInput)
    //         : Number(prevCalculation.operandLeft + "." + newInput),
    //       isDecimalPoint: prevCalculation.isDecimalPoint
    //         ? !prevCalculation.isDecimalPoint
    //         : prevCalculation.isDecimalPoint
    //     } 
    //   } else {
    //   //case operator is chosen       
    //     return {
    //       ...prevCalculation,
    //       operandRight: !prevCalculation.isDecimalPoint
    //         ? Number(Number(prevCalculation.operandRight) + newInput)
    //         : Number(Number(prevCalculation.operandRight) + "." + newInput),
    //       isDecimalPoint: prevCalculation.isDecimalPoint
    //         ? !prevCalculation.isDecimalPoint
    //         : prevCalculation.isDecimalPoint
    //     }
    //   }   
    // });
  }

  const handleDecimalClick = (event) => {
    // if (!display.includes('.')) {
    //   setDisplay((prevDisplay) => prevDisplay + '.');
    //   setCalculation((prevCalculation) => {               
    //       return {...prevCalculation, isDecimalPoint: true}           
    //   });
    // }
    console.log(`${event.target} is clicked`);
  };

  const handleOperatorClick = (event) => {
    console.log(`${event.target} is clicked`)     
    
    // const currentOperation = event.target.id;
    // setCalculation((prevCalculation) => {
    //   // case no right operand is present
    //   if (!prevCalculation.operandRight) {             
    //     return {...prevCalculation,
    //       operator: operatorsLookup[currentOperation],
    //       isDecimalPoint: false}
    //   }
    // })
  }

  const handleEqualsClick = (event) => {
    console.log(event.target);
  }

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
    )
  
  return (
    <div className="App">
      <Formula
        value={formula}
      />
      <Display
        value={display}
      />
      {buttonsToRender}      
    </div>
  );
};

export default App;

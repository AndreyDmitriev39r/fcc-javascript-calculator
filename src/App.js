import Display from "./components/Display";
import Digit from "./components/Digit";

import { digits, operators } from "./data";

function App() {
  const digitsToRender = digits.map(digit =>
    <Digit
      key={digit.id}
      id={digit.id}
      value={digit.value}
      style = {{gridArea: digit.id}}
    />)
  return (
    <div className="App">
      <Display />
      {digitsToRender}
    </div>
  );
}

export default App;

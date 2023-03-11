function Digit({id, value, style}) {  
  return (
    <button id={id} className="digit" style={{...style}}>
      {value}
    </button>
  );
}

export default Digit;
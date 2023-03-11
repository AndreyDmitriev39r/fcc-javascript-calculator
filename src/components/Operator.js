function Operator({id, value, style}) {  
  return (
    <button id={id} className="operator" style={{...style}}>
      {value}
    </button>
  );
}

export default Operator;
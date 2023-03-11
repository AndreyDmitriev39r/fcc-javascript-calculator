function DecimalPoint({id, value, style}) {  
  return (
    <button id={id} className="decimalpoint" style={{...style}}>
      {value}
    </button>
  );
}

export default DecimalPoint;
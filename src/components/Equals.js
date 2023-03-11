function Equals({id, value, style}) {  
  return (
    <button id={id} className="equals" style={{...style}}>
      {value}
    </button>
  );
}

export default Equals;
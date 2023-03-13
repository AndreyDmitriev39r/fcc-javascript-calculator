function DecimalPoint({id, value, style, clickHandler}) {  
  return (
    <button
      id={id}
      className="decimalpoint"
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default DecimalPoint;
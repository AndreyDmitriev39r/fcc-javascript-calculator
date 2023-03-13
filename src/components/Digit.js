function Digit({id, value, style, clickHandler}) {  
  return (
    <button
      id={id}
      className="digit"
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Digit;
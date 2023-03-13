function Operator({id, value, style, clickHandler}) {  
  return (
    <button
      id={id}
      className="operator"
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Operator;
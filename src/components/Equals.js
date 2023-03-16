function Equals({id, value, style, clickHandler}) {  
  return (
    <button
      id={id}
      className="equals"
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Equals;
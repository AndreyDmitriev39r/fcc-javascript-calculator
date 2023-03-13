function Clear({id, value, style, clickHandler}) {  
  return (
    <button
      id={id}
      className="clear"
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Clear;
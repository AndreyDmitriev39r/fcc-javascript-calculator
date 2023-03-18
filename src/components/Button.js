function Button({id, value, operation, style, clickHandler}) {  
  return (
    <button
      id={id}      
      style={{...style}}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Button;
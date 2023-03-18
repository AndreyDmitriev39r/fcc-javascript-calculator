function Button({id, value, operation, style, clickHandler}) {  
  return (
    <button
      id={id}      
      style={{...style}}
      onClick={(event) => clickHandler(event, value)}
    >
      {value}
    </button>
  );
}

export default Button;
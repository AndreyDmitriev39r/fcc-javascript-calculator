function Button({id, value, operation, style, clickHandler}) {  
  return (
    <button
      id={id}      
      style={{...style}}
      onClick={(event) => clickHandler(event, value, operation)}
    >
      {value}
    </button>
  );
}

export default Button;
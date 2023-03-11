function Clear({id, value, style}) {  
  return (
    <button id={id} className="clear" style={{...style}}>
      {value}
    </button>
  );
}

export default Clear;
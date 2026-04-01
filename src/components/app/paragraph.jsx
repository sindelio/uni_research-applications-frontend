function P(props) {
  let defaultClass = 'my-2';
  const inputClass = props?.inputClass;
  let renderedClass = defaultClass;
  if (inputClass !== null && inputClass !== undefined) {
    renderedClass = defaultClass.concat(' ', inputClass);
  }
  return (
    <p 
      id={props.id} 
      name={props.id} 
      className={renderedClass}
    >
      {props.children}
    </p>
  );
  
}

export default P;

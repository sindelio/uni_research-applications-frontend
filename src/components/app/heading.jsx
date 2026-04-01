function Heading(props) {
  let defaultClass = 'mt-4 mb-8 text-3xl';
  const inputClass = props?.inputClass;
  let renderedClass = defaultClass;
  if (inputClass !== null && inputClass !== undefined) {
    renderedClass = defaultClass.concat(' ', inputClass);
  }
  return (
    <h1 
      id={props.id || 'heading'} 
      class={renderedClass}
    >
      {props.children}
    </h1>
  );
}

export default Heading;

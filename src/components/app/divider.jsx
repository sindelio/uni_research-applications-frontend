function Divider(props) {
  let defaultClass = 'w-[80%] h-[0.15rem] mx-auto my-8 bg-white rounded-2xl';
  const inputClass = props?.inputClass;
  let renderedClass = defaultClass;
  if (inputClass !== null && inputClass !== undefined) {
    renderedClass = defaultClass.concat(' ', inputClass);
  }
  return (
    <hr 
      id={props.id || 'divider'} 
      class={renderedClass}
    >
      
    </hr>
  );
}

export default Divider;

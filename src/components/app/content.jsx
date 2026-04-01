function Content(props) {
  return (
    <div 
      id={props.id || 'content'} 
      class="text-sm md:text-lg ml-72 m-8"
    >
      {props.children}
    </div>
  );
}

export default Content;

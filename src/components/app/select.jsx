import { onMount } from 'solid-js';
import exists from '../../helpers/exists';

function Select(props) {
  onMount(async () => {
    const children = props.children;
    const selectEl = document.getElementById(props.id);
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      selectEl.appendChild(child);
    }
  });
  let defaultClass =
    'mt-2 mb-6 px-4 py-1 border border-purple-400 bg-transparent rounded-lg focus:outline-purple-600';
  const inputClass = props?.inputClass;
  let renderedClass = defaultClass;
  if (exists(inputClass)) {
    renderedClass = defaultClass.concat(' ', inputClass);
  }
  return (
    <div>
      <p>{props.label}</p>
      <select
        id={props.id}
        name={props.id}
        class={renderedClass}
        oninput={props.oninput || null}
      >
        {/* props.children for some reason does not work */}
      </select>
      <br />
    </div>
  );
}

export default Select;

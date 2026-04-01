import '../../styles/waves.css';

function Waves() {
  return (
    <div class="waveHeader">
      <div>
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="#8b5cf6" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="#7c3aed" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="#6d28d9" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#5b21b6" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Waves;

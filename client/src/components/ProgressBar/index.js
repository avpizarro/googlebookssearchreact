
function ProgressBar(props) {
  return (
  // <div className="progressbar" style={{width: "20%"}}></div>;
  <progress className="progress is-small progressbar" value={props.value} max="100"></progress>
  )
}

export default ProgressBar;

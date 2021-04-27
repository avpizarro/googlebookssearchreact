
function ProgressBar() {
  return (
  // <div className="progressbar" style={{width: "20%"}}></div>;
  <progress className="progress is-small progressbar" value="20" max="100"></progress>
  )
}

export default ProgressBar;

// import BookContext from "../../utils/GlobalState";

function Modal(props) {
  // const { author, title, link, description, image } = useContext(BookContext);
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal is-active" style={{ minHeight: "100px", height:"fit-content"}}>
      <div className="modal-background"></div>
      <div className="modal-content ml-6 mr-6 has-text-white">
        <div className="media">
          <div className="media-left">
            <figure >
              <img src={props.image} alt={props.title} style={{height: "72px", width: "48px"}}/>
            </figure>
          </div>
          <p>
            <div className="media-content mt-4">
              <div className="content">
                <span>
                  <span className="is-size-5">{props.title} </span>{props.message}
                </span>
              </div>
            </div>
          </p>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.close}
      ></button>
    </div>
  );
}
export default Modal;

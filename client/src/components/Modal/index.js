// import BookContext from "../../utils/GlobalState";

function Modal(props) {
  // const { author, title, link, description, image } = useContext(BookContext);
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal is-active" style={{ height: "100px" }}>
      <div className="modal-background"></div>
      <div className="modal-content ml-6 has-text-white">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={props.image} />
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

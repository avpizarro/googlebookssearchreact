// import BookContext from "../../utils/GlobalState";

function Modal(props) {
  // const { author, title, link, description, image } = useContext(BookContext);

  return <div className="modal" style={{height: "100px"}}>
  <div className="modal-background"></div>
  <div className="modal-content ml-6 has-text-white"><img src={props.image} style={{height: "80px"}} alt={props.title}></img><span className="ml-6">{props.title} has been saved
  </span></div>
  <button className="modal-close is-large" aria-label="close"></button>
</div>
}
export default Modal;

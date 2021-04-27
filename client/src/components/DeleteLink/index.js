function DeleteLink(props) {
  return (
    <a className="card-footer-item" onClick={props.deleteBook} id={props.id}>
      Delete
    </a>
  );
}

export default DeleteLink;

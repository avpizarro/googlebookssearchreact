function SaveLink(props) {
  return ( 
    <a
      className="card-footer-item"
      onClick={props.saveBook}
      title={props.title}
      author={props.author}
      link={props.link}
      description={props.description}
      image={props.image}
    >
      Save
    </a>
  );
}

export default SaveLink;

function ReadMore(props) {

    if (!props.showReadMore) {
      return null;
    }

  return (
    <div>
      <a className="read-more-link" onClick={props.expandOnClick}>
        <h5 className="read-more">{props.linkName}</h5>
      </a>
      <p>{props.extraContent}</p>
    </div>
  );
}

export default ReadMore;

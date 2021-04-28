// import ReadMoreContent from "../../ReadMoreContent";

function ReadMore(props) {
  if (!props.showReadMore) {
    return null;
  }

  {
    /* <ReadMoreContent extraContent={props.extraContent} linkName={props.linkName}/> */
  }
  return (
    <span className="read-more-link read-more is-size-6 ml-2 has-text-black" onClick={props.expandOnClick}>
     {props.linkName}
    </span>
  );
}

export default ReadMore;

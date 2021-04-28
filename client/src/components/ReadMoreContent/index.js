
function ReadMoreContent (props) {
    if(props.linkName === "Read More >> " || !props.linkName) {
        return null

    } 
    
    return (
        <span className="read-more-content">{props.extraContent}</span>
    )
}

export default ReadMoreContent;
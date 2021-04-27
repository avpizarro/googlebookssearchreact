// import BookContext from "../../utils/GlobalState";

function CardContent({ author, title, link, description, image }) {
  // const { author, title, link, description, image } = useContext(BookContext);

  return (
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src={image} alt="Book cover"></img>
          </figure>
        </div>
        <br></br>
        <div class="media-content" style={{ marginTop: "1.5rem" }}>
          <p class="title is-4">{title}</p>
          <p class="subtitle is-6">{author}</p>
        </div>
      </div>
      <div class="content" style={{ textAlign: "justify" }}>
        {description}
        <br></br>
        <a href={link} className="preview-link">
          Preview Link
        </a>
      </div>
    </div>
  );
}
export default CardContent;

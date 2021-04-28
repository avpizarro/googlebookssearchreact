import ReadMore from "../ReadMore";
import ReadMoreContent from "../ReadMoreContent";

function CardContent({ author, title, link, description, image, linkName, expandOnClick, extraContent, showReadMore  }) {

  return (
    <div class="card-content">
      <div class="media m-0">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src={image} alt="Book cover"></img>
          </figure>
        </div>
        <br></br>
        <div class="media-content">
          <p class="title is-4">{title}</p>
          <p class="subtitle is-6">{author}</p>
        </div>
      </div>
      <div class="content mt-6" style={{ textAlign: "justify" }}>
        {description}
        <ReadMoreContent extraContent={extraContent} linkName={linkName}/>
        <ReadMore expandOnClick={expandOnClick} showReadMore={showReadMore} linkName={linkName}/>
        <br></br>
        <br></br>
        <a href={link} target="_blank" className="preview-link">
          Preview Link
        </a>
      </div>
    </div>
  );
}
export default CardContent;

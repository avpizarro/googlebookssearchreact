import React, { useState } from "react";

function ReadMore() {
  let readMore = true;
  const extraContent = (
    <div>
      <p className="extra-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
        consectetur neque ab porro quasi culpa nulla rerum quis minus
        voluptatibus sed hic ad quo sint, libero commodi officia aliquam!
        Maxime.
      </p>
    </div>
  );
  const linkName = readMore ? "Read Less << " : "Read More >> ";
  const expandOnClick = (e) => {
    e.preventDefault();
    readMore = false;
  };
  return (
    <div>
      <a className="read-more-link" onClick={expandOnClick}>
        <h2>{linkName}</h2>
      </a>
      {readMore && extraContent}
    </div>
  );
}

export default ReadMore();

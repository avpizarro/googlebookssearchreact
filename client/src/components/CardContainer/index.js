function CardContainer({ children }) {
  return (
    <div
      className="is-container columns is-multiline"
      style={{ margin: "auto", marginTop: "40px", maxWidth: "90%" }}
    >{children}</div>
  );
}

export default CardContainer;

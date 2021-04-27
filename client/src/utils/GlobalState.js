import { createContext } from "react";

const BookContext = createContext({
  author: "",
  description: "",
  image: "",
  link:
    "",
  title: "",
});
    

export default BookContext;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/index";
import Header from "../components/Header/index";
import BookSearch from "../components/BookSearch/index";
import CardContainer from "../components/CardContainer/index";
import BookCard from "../components/BookCard/index";
import ProgressBar from "../components/ProgressBar";
import SaveLink from "../components/SaveLink";
import CardFooter from "../components/CardFooter";
import API from "../utils/API";
import CardContent from "../components/CardContent";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Search() {
  const initialQuery = localStorage.getItem("Search");

  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState(initialQuery || "");
  const [bookToSave, setBooktoSave] = useState({});

  useEffect(() => {
    loadBooks();
  }, [query]);

  function loadBooks() {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + query)
      .then((res) => {
        console.log(res.data.items);
        setBooks(res.data.items);
      });
  }

  const InputValueOnChange = (e) => {
    e.preventDefault();
    console.log("New input Value", e.target.value);
    setInputValue(e.target.value);
    localStorage.clear();
    localStorage.setItem("Search", e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const saveBook = (e) => {
    console.log(`I have been clicked ${e.target.title}`);
    const chosenBook = books.filter(
      (book) => book.volumeInfo.title === e.target.title
    );
    if(chosenBook && bookToSave){
      console.log(chosenBook[0].volumeInfo);
    setBooktoSave(chosenBook[0].volumeInfo);
    
    API.saveBook({
        title: bookToSave.title,
        author: bookToSave.authors[0],
        link: bookToSave.previewLink,
        description: bookToSave.description,
        image: bookToSave.imageLinks.smallThumbnail,
      }
        )
      .then((res) => console.log("Book saved " + res))
      .catch((err) => console.log(err));
    };
  };

  return (
    <div className="App">
      <ProgressBar />
      <Navbar />
      <Header />
      <Modal />
      <BookSearch
        handleFormSubmit={handleFormSubmit}
        InputValueOnChange={InputValueOnChange}
      />
      <CardContainer>
        {books.map((book) => (
          <BookCard key={book.volumeInfo.previewLink}>
            <Card>
              <CardContent
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors[0]}
                link={book.volumeInfo.previewLink}
                description={book.volumeInfo.description}
                image={book.volumeInfo.imageLinks.smallThumbnail}
              ></CardContent>
              <CardFooter>
                <SaveLink
                  saveBook={saveBook}
                  title={book.volumeInfo.title}
                ></SaveLink>
              </CardFooter>
            </Card>
          </BookCard>
        ))}
      </CardContainer>
    </div>
  );
}

export default Search;

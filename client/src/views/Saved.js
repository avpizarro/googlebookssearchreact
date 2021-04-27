import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/index";
import Header from "../components/Header/index";
import CardContainer from "../components/CardContainer/index";
import BookCard from "../components/BookCard/index";
import DeleteLink from "../components/DeleteLink/index";
import Card from "../components/Card/index";
import CardContent from "../components/CardContent";
import CardFooter from "../components/CardFooter";
import Modal from "../components/Modal";
import API from "../utils/API";

function Saved() {
  const [books, setBooks] = useState([]);
  const [booksUpdated, setBooksUpdated] = useState([]);
  const [show, setShow] = useState(false);
  const [deletedBook, setDeletedBook] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, [booksUpdated]);

  // Loads all books and sets them to books
  function loadBooks() {
    axios
      .get("/api/books/")
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  const deleteBook = (e) => {
    console.log(e.target.id);
    const savedBooks = books.filter((book) => book._id !== e.target.id);
    const bookToDelete = books.filter((book) => book._id === e.target.id);
    setDeletedBook(bookToDelete);
    console.log(deletedBook);
    setBooks(savedBooks);
    setBooksUpdated(savedBooks);
    API.deleteBook(e.target.id)
      .then((res) => {
        console.log("Book deleted: " + res);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => setShow(false);

  if (deletedBook) {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <Modal
          show={show}
          Close={closeModal}
          // title={deletedBook[0].title}
          // image={deletedBook[0].image}
          message="Book deleted"
        />

        <CardContainer>
          {books.map((book) => (
            <BookCard key={book.link}>
              <Card>
                <CardContent
                  title={book.title}
                  author={book.author}
                  link={book.link}
                  description={book.description}
                  image={book.image}
                ></CardContent>
                <CardFooter>
                  <DeleteLink
                    deleteBook={deleteBook}
                    id={book._id}
                  ></DeleteLink>
                </CardFooter>
              </Card>
            </BookCard>
          ))}
        </CardContainer>
      </div>
    );
  }
}

export default Saved;

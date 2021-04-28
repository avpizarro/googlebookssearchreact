// Import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import components
import Navbar from "../components/Navbar/index";
import Header from "../components/Header/index";
import CardContainer from "../components/CardContainer/index";
import BookCard from "../components/BookCard/index";
import DeleteLink from "../components/DeleteLink/index";
import Card from "../components/Card/index";
import CardContent from "../components/CardContent";
import CardFooter from "../components/CardFooter";
import Modal from "../components/Modal";

// Import utils
import API from "../utils/API";

// Create Saved page component
function Saved() {

  // Set the states to display books, modal and render again after a Book is deleted
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [deletedBook, setDeletedBook] = useState({
    volumeInfo: {
      title: "",
      imageLinks: {
        smallThumbnail: "",
      },
    },
  });

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

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
// Function to delete a Book
  const deleteBook = (e) => {

    // Remove the deleted book from saved books array and stop displaying it
    const savedBooks = books.filter((book) => book._id !== e.target.id);
    setBooks(savedBooks);
    
    // Get the info from the deleted book to display in Modal
    const bookToDelete = books.filter((book) => book._id === e.target.id);
    setDeletedBook(bookToDelete[0]);

// POST request to delete Book from db
    API.deleteBook(e.target.id)
      .then((res) => {
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  // Function to close the modal
  const closeModal = () => setShow(false);

  
    return (
      <div className="App">
        <Navbar />
        <Header />
        <Modal
        show={show}
        close={closeModal}
        message="was removed"
        title={deletedBook.title}
        image={deletedBook.image}
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


export default Saved;

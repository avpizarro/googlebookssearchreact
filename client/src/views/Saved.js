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

  // Set State to change the linkName
  const [linkName, setLinkName] = useState("Read More >> ");

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    axios
      .get("/api/books/")
      .then((res) => {
        console.log(res.data);
        const bookToAdd = res.data.map((book) => {
          if (!book.description) {
            return {
              author: book.author,
              title: book.title,
              image: book.image,
              description: "",
              descriptionShort: "",
              link: book.link,
              extraDescription: "",
              showReadMore: false,
              id: book._id
            };
          } else if (book.description.length < 400) {
            return {
              author: book.author,
              title: book.title,
              image: book.image,
              description: book.description,
              descriptionShort: book.description,
              link: book.link,
              extraDescription: "",
              showReadMore: false,
              id: book._id
            };
          } else {
            return {
              author: book.author,
              title: book.title,
              image: book.image,
              description: book.description,
              descriptionShort: book.description.slice(0, 400),
              link: book.link,
              extraDescription: book.description.slice(400, -1),
              showReadMore: true,
              id: book._id
            };
          }
        });
        console.log(bookToAdd);
        setBooks(bookToAdd);
      })
      //   console.log(res);

      //   setBooks(res.data);
      // })
      .catch((err) => console.log(err));
  }
  // Function to delete a Book
  const deleteBook = (e) => {
    // Get the info from the deleted book to display in Modal
    const chosenBook = books.filter((book) => book.id === e.target.id);
    const bookToDelete = chosenBook[0];
    setDeletedBook(bookToDelete);
    
    // Remove the deleted book from saved books array and stop displaying it
    const savedBooks = books.filter((book) => book.id !== e.target.id);
    setBooks(savedBooks);



    // POST request to delete Book from db
    API.deleteBook(e.target.id)
      .then((res) => {
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  // Function to close the modal
  const closeModal = () => setShow(false);

  //  Function to expand the ReadMore
  const expandOnClick = (e) => {
    if (linkName === "Read Less << ") {
      setLinkName("Read More >> ");
    } else {
      setLinkName("Read Less << ");
    }
  };

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
                image={book.image}
                author={book.author}
                title={book.title}
                link={book.link}
                description={book.descriptionShort}
                expandOnClick={expandOnClick}
                extraContent={book.extraDescription}
                linkName={linkName}
                showReadMore={book.showReadMore}
              ></CardContent>
              <CardFooter>
                <DeleteLink deleteBook={deleteBook} id={book.id}></DeleteLink>
              </CardFooter>
            </Card>
          </BookCard>
        ))}
      </CardContainer>
    </div>
  );
}

export default Saved;

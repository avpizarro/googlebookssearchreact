// Import external dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import local components
import logo from "../images/logo192.png"
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

// Create Search Page Component
function Search() {
  // Set the initial query to be the last searched paramenter
  const initialQuery = localStorage.getItem("Search");

  // Define the states

  // Define the books to load
  const [books, setBooks] = useState([]);

  // Define State to handle the user input value
  const [inputValue, setInputValue] = useState("");
  // Define the sate for the query to trigger useEffect whne a new query is made
  const [query, setQuery] = useState(initialQuery || "");

  // Define a state to send data about the chosen book to the modal component
  const [bookForModal, setBookForModal] = useState({
    volumeInfo: {
      title: "",
      imageLinks: {
        smallThumbnail: "",
      },
    },
  });
  // Set state to show or hide the modal component
  const [show, setShow] = useState(false);
  // Set state for Modal message
  const [modalMessage, setModalMessage] = useState("");

  // Set State to change the linkName
  const [linkName, setLinkName] = useState("Read More >> ");

  // Set state for progress bar
  const [progressValue, setProgressValue] = useState("0");

  // Set useEffect to trigger the rendering upon change of query
  useEffect(() => {
    loadBooks();
    setProgressValue("0");
  }, [query]);

  // Define the function to get the books data from the API and set the state
  function loadBooks() {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + query)
      .then((res) => {
        console.log(res.data.items);
        const booksToAdd = res.data.items.map((book) => {
          if (!book.volumeInfo.imageLinks) {
            return {authors: book.volumeInfo.authors || "",
            title: book.volumeInfo.title || "",
            image: logo,
            description: "",
            descriptionShort: "",
            link: book.volumeInfo.previewLink || "",
            extraDescription: "",
            showReadMore: false,
          }
          }
          else if (!book.volumeInfo.description) {
            return {
              authors: book.volumeInfo.authors || "",
              title: book.volumeInfo.title || "",
              image: book.volumeInfo.imageLinks.smallThumbnail || "",
              description: "",
              descriptionShort: "",
              link: book.volumeInfo.previewLink || "",
              extraDescription: "",
              showReadMore: false,
            };
          } else if (book.volumeInfo.description.length < 400) {
            return {
              authors: book.volumeInfo.authors || "",
              title: book.volumeInfo.title || "",
              image: book.volumeInfo.imageLinks.smallThumbnail || "",
              description: book.volumeInfo.description,
              descriptionShort: book.volumeInfo.description,
              link: book.volumeInfo.previewLink || "",
              extraDescription: "",
              showReadMore: false,
            };
          } else {
            return {
              authors: book.volumeInfo.authors || "",
              title: book.volumeInfo.title || "",
              image: book.volumeInfo.imageLinks.smallThumbnail || "",
              description: book.volumeInfo.description,
              descriptionShort: book.volumeInfo.description.slice(0, 400),
              link: book.volumeInfo.previewLink ,
              extraDescription: book.volumeInfo.description.slice(400, -1),
              showReadMore: true,
            };
          }
        });
        console.log(booksToAdd);
        setBooks(booksToAdd);
      });
  }

  // Handle the user input onChange, add and clear local storage accordingly
  const InputValueOnChange = (e) => {
    e.preventDefault();
    console.log("New input Value", e.target.value);
    setInputValue(e.target.value);
    localStorage.clear();
    localStorage.setItem("Search", e.target.value);
  };

  // Function to start searching onClick
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    setProgressValue(null);
  };

  // Function to save the Book in the db, trigger the modal
  const saveBook = (e) => {
    setModalMessage("");
    console.log(`I have been clicked ${e.target.title}`);
    const chosenBook = books.filter((book) => book.link === e.target.title);
    const bookToSave = chosenBook[0];
    setBookForModal(bookToSave);

    API.saveBook({
      title: bookToSave.title,
      author: bookToSave.authors[0],
      link: bookToSave.link,
      description: bookToSave.description,
      image: bookToSave.image,
    })
      .then((res) => {
        console.log("Book saved " + res);
        setShow(true);
        setModalMessage("was added");
      })
      .catch((err) => {
        setShow(true);
        setModalMessage("was already added");
        return err;
      });
  };

  // Function to close the Modal
  const closeModal = () => setShow(false);

  // function to show ReadmoreLink

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
      <ProgressBar value={progressValue} />
      <Navbar />
      <Header />
      <Modal
        show={show}
        close={closeModal}
        title={bookForModal.title}
        message={modalMessage}
        image={bookForModal.image}
      />
      <BookSearch
        handleFormSubmit={handleFormSubmit}
        InputValueOnChange={InputValueOnChange}
      />
      <CardContainer>
        {books.map((book) => (
          <BookCard key={book.link}>
            <Card>
              <CardContent
                image={book.image}
                author={book.authors[0]}
                title={book.title}
                link={book.link}
                description={book.descriptionShort}
                expandOnClick={expandOnClick}
                extraContent={book.extraDescription}
                linkName={linkName}
                showReadMore={book.showReadMore}
              ></CardContent>
              <CardFooter>
                <SaveLink saveBook={saveBook} title={book.link}></SaveLink>
              </CardFooter>
            </Card>
          </BookCard>
        ))}
      </CardContainer>
    </div>
  );
}

// Export the function so it can be used in App.js
export default Search;

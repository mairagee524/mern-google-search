import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/OneBook";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/BookList";
import "../pages.css"

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    API.getAllBooks()
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getAllBooks());
  };

  render() {  
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h2 className="saved-list-title"> Saved Books</h2>
            <Card icon="download">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        <button
                          onClick={() => {
                            this.handleBookDelete(book._id);
                            alert("The book will be removed from your saved list.")
                          }}
                          className="delete-btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Books</h2>
              )}
            </Card>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default Saved;
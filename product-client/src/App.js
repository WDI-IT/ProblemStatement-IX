import React from "react";
import { CardComponent } from "./CardComponent";
import Header from "./Header";
import { Form, Input, Button, Container, Col, Row } from "reactstrap";

class App extends React.Component {
  state = {
    data: [],
    search: "",
  };
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
    console.log(this.state.search);
  }
  async componentDidMount() {
    await fetch("https://product-node-server.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
        console.log(this.state.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    let info = this.state.data.filter((item) => {
      return item.name.toLowerCase().indexOf(this.state.search) !== -1;
    });

    return (
      <div>
        <Header />
        <div
          style={{
            width: "50%",
            margin: "auto",
            marginTop: "3em",
            marginBottom: "4em",
          }}
        >
          <Form>
            <div className="row conatiner ">
              <div className="col-2"></div>
              <div className="col-8">
                <Input
                  className="form-control form-control-lg mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                />
              </div>
              <div className="col-2"></div>
            </div>
          </Form>
        </div>
        <Container>
          <Row>
            {info.map((product, index) => {
              return (
                <Col className="mb-3">
                  <CardComponent
                    id={product._id}
                    name={product.name}
                    imgurl={product.imgurl}
                    description={product.description}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

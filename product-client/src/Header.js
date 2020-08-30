import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
const axios = require("axios").default;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
      edit: false,
      delete: false,
      name: "",
      imgurl: "",
      description: "",
      productId: "",
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleEdit() {
    this.setState({
      edit: !this.state.edit,
    });
  }
  toggleDelete() {
    this.setState({
      delete: !this.state.delete,
    });
  }
  handleEdit = (e) => {
    var url = this.state.productId;
    axios
      .patch(`https://product-node-server.herokuapp.com/${url}`, {
        name: this.state.name,
        imgurl: this.state.imgurl,
        description: this.state.description,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  };
  handleDelete = (e) => {
    var url = this.state.productId;
    console.log(url);
    axios
      .patch(`https://product-node-server.herokuapp.com/${url}`, {
        display: "false",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  };

  handleSubmit = (e) => {
    axios
      .post("https://product-node-server.herokuapp.com/", {
        name: this.state.name,
        imgurl: this.state.imgurl,
        description: this.state.description,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  };
  hadleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
    console.log(this.state.productId);
  };
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand style={{ color: "#fff" }} href="/">
            XYZ.inc
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar></Nav>
          </Collapse>
          <div>
            <Button color="success" onClick={this.toggleModal}>
              Add Item
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Add Item</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.hadleChange}
                  />
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Image Url"
                    onChange={this.hadleChange}
                    name="imgurl"
                  />
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Description"
                    onChange={this.hadleChange}
                    name="description"
                    className="mb-3"
                  />
                  <Button
                    type="submit"
                    outline
                    color="success"
                    onClick={this.toggleModal}
                  >
                    Save
                  </Button>
                  <Button
                    className="ml-3"
                    outline
                    color="warning"
                    type="reset"
                    onClick={this.toggleModal}
                  >
                    Cancel
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          <div className="ml-3">
            <Button color="warning" onClick={this.toggleEdit}>
              Edit Item
            </Button>
            <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
              <ModalHeader toggle={this.toggleEdit}>Edit Item</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleEdit}>
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Product Id"
                    name="productId"
                    onChange={this.hadleChange}
                  />
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.hadleChange}
                  />
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Image Url"
                    onChange={this.hadleChange}
                    name="imgurl"
                  />
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Description"
                    onChange={this.hadleChange}
                    name="description"
                    className="mb-3"
                  />
                  <Button
                    type="submit"
                    outline
                    color="success"
                    onClick={this.toggleEdit}
                  >
                    Save
                  </Button>
                  <Button
                    className="ml-3"
                    outline
                    color="warning"
                    type="reset"
                    onClick={this.toggleEdit}
                  >
                    Cancel
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          <div className="ml-3">
            <Button color="danger" onClick={this.toggleDelete}>
              Delete Item
            </Button>
            <Modal isOpen={this.state.delete} toggle={this.toggleDelete}>
              <ModalHeader toggle={this.toggleDelete}>Delete Item</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleDelete}>
                  <Input
                    className="form-control mr-sm-2 mb-3"
                    type="text"
                    placeholder="Product Id"
                    name="productId"
                    onChange={this.hadleChange}
                    required
                  />

                  <Button
                    type="submit"
                    outline
                    color="success"
                    onClick={this.toggleDelete}
                  >
                    Save
                  </Button>
                  <Button
                    className="ml-3"
                    outline
                    color="warning"
                    type="reset"
                    onClick={this.toggleDelete}
                  >
                    Cancel
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;

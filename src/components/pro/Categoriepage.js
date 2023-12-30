import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Table,
} from "reactstrap";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";
import { useLocation } from "react-router-dom";

const Categoriepage = () => {
  const location = useLocation();
  const object = location.state?.categorie;

  const [categorie, setCategorie] = useState({
    id: object?.id || "",
    nom: object?.nom || "",
  });

  const onInputChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };

  const [response, setResponse] = useState({ status: false });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(categorie);
    let head = { "content-type": "application/json" };
    fetch("http://localhost:8080/blog/categorie/", {
      method: "PUT",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(response);
        console.log(response);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleUpdateModal = (category) => {
    setCategoryToUpdate(category);
    setUpdateCategoryName(category?.nom || "");
    setCategorie({ id: category?.id || "", nom: category?.nom || "" });
    setUpdateModalOpen(!updateModalOpen);
  };

  const toggleDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:8080/blog/categorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: newCategoryName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reload categories after adding a new one
      loadCategories();

      // Close the modal
      toggleModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      console.log("Updating category with name:", categorie);
      let data = JSON.stringify(categorie);
      let head = { "Content-Type": "application/json" };

      const response = await fetch("http://localhost:8080/blog/categorie", {
        method: "PUT",
        headers: head,
        body: data,
      });

      // Check if the response is successful
      if (response.ok) {
        // Reload categories after updating
        loadCategories();

        // Close the update modal
        toggleUpdateModal(null);
      } else {
        // Handle non-successful response here
        console.error("Error updating category. HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/blog/categorie/${categoryToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reload categories after deleting one
      loadCategories();

      // Close the delete modal
      toggleDeleteModal(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const loadCategories = () => {
    fetch("http://localhost:8080/blog/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Layoutprop />
      <Container className="mt--7" fluid style={{ padding: "60px" }}>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Liste des categories</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" onClick={toggleModal}>
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((categorie) => (
                      <tr key={categorie.id}>
                        <th scope="row">{categorie.id}</th>
                        <td>{categorie.nom}</td>
                        <td>
                          <Button
                            color="info"
                            onClick={() => toggleUpdateModal(categorie)}
                          >
                            Update
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => toggleDeleteModal(categorie)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add Category Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="categoryName">Category Name</label>
              <Input
                type="text"
                id="categoryName"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddCategory}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update Category Modal */}
      <Modal isOpen={updateModalOpen} toggle={() => toggleUpdateModal(null)}>
        <ModalHeader toggle={() => toggleUpdateModal(null)}>
          Update Category
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup>
              <label htmlFor="updateCategoryName">Category Name</label>
              <Input
                type="text"
                id="updateCategoryName"
                placeholder="Nom de categorie"
                name="nom"
                onChange={(e) => onInputChange(e)}
                value={categorie.nom}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={() => handleUpdateCategory()}>
            Update
          </Button>
          <Button color="secondary" onClick={() => toggleUpdateModal(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Category Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} toggle={() => toggleDeleteModal(null)}>
        <ModalHeader toggle={() => toggleDeleteModal(null)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete the category "{categoryToDelete?.nom}
          "?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={() => toggleDeleteModal(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Footer></Footer>
    </>
  );
};

export default Categoriepage;

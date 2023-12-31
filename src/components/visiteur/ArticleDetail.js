import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Footer from "./Footer";
import { Modal, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom/dist";
import axios from "axios";

function ArticleDetail() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const object = location.state.article;
  const [formData, setFormData] = useState({
    id: object.id,
    titre: object.titre,
    photo: object.photo,
    texte: object.texte,
    date: object.date,
    lien: object.lien,
    categorie: {
      id: object.categorie.id,
      nom: "",
    },
    user: {
      id: object.user.id,
      username: object.user.username,
    },
  });
  const [comments, setComments] = useState([]);
  const [commentFormData, setCommentFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("handleCommentSubmit function called");

    const commentData = {
      visiteur: {
        nom: commentFormData.name,
        email: commentFormData.email,
      },
      texte: commentFormData.comment,
      article: { id: object.id },
      date: new Date().toISOString(),
    };
    console.log("been called");
    console.log(JSON.stringify(commentData));
    try {
      const response = await fetch("http://localhost:8080/blog/commentaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        console.log("Comment added successfully", response);
      } else {
        console.error("Error adding comment", response);
      }
    } catch (error) {
      console.error("Error adding comment", error);
    }

    handleModalClose();
    fetchComments();
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/blog/commentaire/article/${formData.id}`
      );
      if (response.ok) {
        const commentsData = await response.json();
        // Organize comments into a tree structure
        const organizedComments = organizeCommentsIntoTree(commentsData);
        setComments(organizedComments);
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  // Function to organize comments into a tree structure
  const organizeCommentsIntoTree = (commentsData) => {
    const commentsMap = new Map();
    const commentsTree = [];

    commentsData.forEach((comment) => {
      commentsMap.set(comment.id, { ...comment, replies: [] });
    });

    commentsData.forEach((comment) => {
      if (comment.commentaireParent) {
        const parentComment = commentsMap.get(comment.commentaireParent.id);
        if (parentComment) {
          parentComment.replies.push(comment);
        } else {
          commentsTree.push(commentsMap.get(comment.id));
        }
      } else {
        commentsTree.push(commentsMap.get(comment.id));
      }
    });

    return commentsTree;
  };

  const renderComments = (comment) => {
    return (
      <div key={comment.id} className="d-flex mb-4">
        <div className="flex-shrink-0"></div>
        <div className="ms-3">
          <div className="fw-bold">{comment.visiteur?.nom || "Anonymous"}</div>
          <div>{comment.texte}</div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="d-flex mt-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ms-3">
                  {renderComments(reply)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <>
      <Layout></Layout>

      <div class="container mt-5">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-lg-8">
            <article>
              <header class="mb-4">
                <h1 class="fw-bolder mb-1">{formData.titre}</h1>

                <div class="text-muted fst-italic mb-2">
                  Posted on {formData.date} by {formData.user.username}
                </div>

                <a
                  class="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  {formData.categorie.nom}
                </a>
              </header>

              <figure class="mb-4">
                <img
                  class="img-fluid rounded"
                  src={formData.photo}
                  alt={formData.titre}
                />
              </figure>

              <section class="mb-5">
                <p class="fs-5 mb-4">{formData.texte}</p>
              </section>
            </article>

            <section className="mb-5">
              <div className="card bg-light">
                <div className="card-body">
                  <form className="mb-4">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Join the discussion and leave a comment!"
                      onClick={handleModalShow}
                    ></textarea>
                  </form>

                  {comments.map((comment) => (
                    <div key={comment.id} className="d-flex mb-4">
                      <div className="flex-shrink-0"></div>
                      <div className="ms-3">
                        <div className="fw-bold">
                          {comment.visiteur?.nom || "Anonymous"}
                        </div>
                        <div>{comment.texte}</div>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="d-flex mt-4">
                            <div className="ms-3">{renderComments(reply)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={commentFormData.name}
                onChange={handleCommentChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={commentFormData.email}
                onChange={handleCommentChange}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment"
                name="comment"
                value={commentFormData.comment}
                onChange={handleCommentChange}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer></Footer>
    </>
  );
}

export default ArticleDetail;

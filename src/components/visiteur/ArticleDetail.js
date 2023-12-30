import React, { useState } from "react";
import Layout from "./Layout";
import Footer from "./Footer";
import { Modal, Button, Form } from "react-bootstrap";

function ArticleDetail() {
  const [showModal, setShowModal] = useState(false);

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
                           
                            <h1 class="fw-bolder mb-1">Welcome to Blog Post!</h1>
                           
                            <div class="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                         
                            <a class="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                            <a class="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                        </header>
                        
                        <figure class="mb-4"><img class="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                       
                        <section class="mb-5">
                            <p class="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                            <p class="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere, so there's no reason to think that Earth would be unique in that regard. Whether of not the life became intelligent is a different question, and we'll see if we find that.</p>
                            <p class="fs-5 mb-4">If you get asteroids about a kilometer in size, those are large enough and carry enough energy into our system to disrupt transportation, communication, the food chains, and that can be a really bad day on Earth.</p>
                            <h2 class="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                            <p class="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                            <p class="fs-5 mb-4">Venus has a runaway greenhouse effect. I kind of want to know what happened there because we're twirling knobs here on Earth without knowing the consequences of it. Mars once had running water. It's bone dry today. Something bad happened there as well.</p>
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
                              
                                <div class="d-flex mb-4">
                                    
                                    <div class="flex-shrink-0"></div>
                                    <div class="ms-3">
                                        <div class="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                       
                                        <div class="d-flex mt-4">
                                            <div class="flex-shrink-0"></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                               
                                
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
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your comment" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

        <Footer></Footer>
        
        </>




    );













}

export default ArticleDetail;
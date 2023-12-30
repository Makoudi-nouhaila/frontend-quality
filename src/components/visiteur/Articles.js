import React, { useState } from "react";
import styles from "../../css/styles.css";
import Layout from "./Layout";
import Footer from "./Footer";
import { Outlet, Link } from "react-router-dom";

function Articles() {
  // Sample data for cards
  const cardsData = [
    {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 9",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "hello",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "Web Design",
      },
      {
        imageSrc: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
        imageAlt: "Image Alt Text 1",
        date: "January 1, 2023",
        title: "Post Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.",
        category: "HTML",
      },
    // Add more card items as needed
  ];

  // Number of cards to show per page
  const cardsPerPage = 6;

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

   // State to track the search term
   const [searchTerm, setSearchTerm] = useState("");

   const [selectedCategory, setSelectedCategory] = useState("");


    // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearchTerm(""); // Reset search term when a category is selected
  };
  

  // Calculate the index range for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
const indexOfFirstCard = indexOfLastCard - cardsPerPage;

const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || card.category === selectedCategory)
  );

const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Layout />
      <header class="py-5 bg-light border-bottom mb-4">
        <div class="container">
          <div class="text-center my-5">
            <h1 class="fw-bolder">Welcome to Blog Home!</h1>
            <p class="lead mb-0">A Bootstrap 5 starter layout for your next blog homepage</p>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            {/* Map over the currentCards array to render cards */}
            {currentCards.map((card, index) => (
              <div key={index} class="card mb-4">
                <a href="#!">
                  <img
                    class="card-img-top"
                    src={card.imageSrc}
                    alt={card.imageAlt}
                  />
                </a>
                <div class="card-body">
                  <div class="small text-muted">
                    {card.date}&nbsp;
                    <a
                      class="badge bg-secondary text-decoration-none link-light"
                      href="#!"
                      style={{ marginLeft: '0.5em' }}
                    >
                      {card.category}
                    </a>
                  </div>
                  <h2 class="card-title">{card.title}</h2>
                  <p class="card-text">{card.description}</p>
                  <Link to="/Articledetail" class="btn btn-primary" >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <nav aria-label="Pagination">
              <hr class="my-0" />
              <ul class="pagination justify-content-center my-4">
                {/* Previous page button */}
                <li
                  class={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    class="page-link"
                    href="#!"
                    onClick={() => paginate(currentPage - 1)}
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Newer
                  </a>
                </li>

                {/* Page numbers */}
                {Array.from({ length: Math.ceil(cardsData.length / cardsPerPage) }).map((_, index) => (
                  <li
                    key={index}
                    class={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      class="page-link"
                      href="#!"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                {/* Next page button */}
                <li
                  class={`page-item ${
                    currentPage ===
                    Math.ceil(cardsData.length / cardsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <a
                    class="page-link"
                    href="#!"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Older
                  </a>
                </li>
              </ul>
            </nav>
          </div>
               
                <div class="col-lg-4">
                    
                <div className="card mb-4">
              <div className="card-header">Search</div>
              <div className="card-body">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter search term..."
                    aria-label="Enter search term..."
                    aria-describedby="button-search"
                    onChange={handleSearchChange}
                  />
                  
                            </div>
                        </div>
                    </div>
                   
                    <div className="card mb-4">
  <div className="card-header">Categories</div>
  <div className="card-body">
    <select
      className="form-select"
      value={selectedCategory}
      onChange={handleCategoryChange}
    >
      <option value="">Select Category</option>
      <option value="Web Design">Web Design</option>
      <option value="HTML">HTML</option>
      <option value="Freebies">Freebies</option>
      <option value="JavaScript">JavaScript</option>
      <option value="CSS">CSS</option>
      <option value="Tutorials">Tutorials</option>
    </select>
  </div>
</div>

                    
                    <div class="card mb-4">
                        <div class="card-header">Side Widget</div>
                        <div class="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    
    </>


        );
  }

  export default Articles;
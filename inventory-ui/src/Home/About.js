import React from "react";
// import "../Inventory/Inventory.css"; // optional if this contains card-row styles

function About() {
  return (
    <section>
      <h2>About</h2>
      <p>
        This inventory management application helps you manage products, stock levels,
        categories, status updates, and overall store operations.
      </p>

      <div className="card-row">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To provide a simple, fast, and reliable product management interface
            for businesses of all sizes.
          </p>
        </div>

        <div className="card">
          <h3>Technology</h3>
          <p>
            Built with React, Spring Boot, Axios, and MySQL — optimized for
            real-time inventory workflows.
          </p>
        </div>

        <div className="card">
          <h3>Version</h3>
          <p>
            Current App Version: <strong>1.0.0</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
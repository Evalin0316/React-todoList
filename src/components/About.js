import {Link} from "react-router-dom";
import React from "react";

function About() {
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }

  export default About;
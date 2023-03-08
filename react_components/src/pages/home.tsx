import SearchString from "../components/search";
import React from "react";
import AllCards from "../components/allCards";

export default function Home() {
  return (    
      <main>
        <SearchString/>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <AllCards/>
      </main>
  );
}

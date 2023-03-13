import SearchString from "../components/search";
import React from "react";
import AllCards from "../components/allCards";

export default function Home() {
  return (    
      <section>
        <SearchString/>
        <h2>Welcome to the Store!</h2>
        <p>Choose your favorite book</p>
        <AllCards/>
      </section>
  );
}

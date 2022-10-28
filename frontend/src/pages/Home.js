import React from "react";
import Test from "./test";
function Home() {

  return (

    <div className="company-container">
        <Test/>
    </div>

  );
}

export default Home;


/*
{listOfCompanies.map((item) => {

    return (

      <div className="item-container" key={item.name}>

        <div className="name">{item.name}</div>
        <div className="email">{item.email}</div>
        <div className="status">{item.status}</div>

      </div>

    );

  })}*/

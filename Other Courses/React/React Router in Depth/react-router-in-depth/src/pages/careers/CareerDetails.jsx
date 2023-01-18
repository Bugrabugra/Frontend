import React from 'react';
import { useLoaderData, useParams } from "react-router-dom";


const CareerDetails = () => {
  const { id } = useParams();
  const career = useLoaderData();

  return (
    <div className="career-details">
      <h2>Career Details for {career.title}</h2>
      <p>Starting salary: {career.salary}</p>
      <p>Location: {career.location}</p>
      <div className="details">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium alias
           animi atque consectetur consequuntur eveniet ex expedita iste maxime mollitia quae quasi
           quod reiciendis repellendus sint soluta, sunt voluptatem.</p>
      </div>
    </div>
  );
};

// loader function
export const careerDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:4000/careers/" + id);

  if (!res.ok) {
    throw Error("Could not find that career")
  }

  return res.json();
};

export default CareerDetails;

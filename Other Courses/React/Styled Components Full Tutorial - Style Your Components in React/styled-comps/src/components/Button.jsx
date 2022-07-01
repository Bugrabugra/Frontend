import React from 'react';


const Button = ({ className, buttonLabel }) => {
  return (
    <button className={className}>{buttonLabel}</button>
  );
};

export default Button;

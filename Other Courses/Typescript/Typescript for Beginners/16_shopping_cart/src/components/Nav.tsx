import React from 'react';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const button = viewCart
    ? <button onClick={() => setViewCart(false)}>View products</button>
    : <button onClick={() => setViewCart(true)}>View cart</button>;

  const content = (
    <nav className="nav">
      {button}
    </nav>
  )

  return content;
};

export default Nav;

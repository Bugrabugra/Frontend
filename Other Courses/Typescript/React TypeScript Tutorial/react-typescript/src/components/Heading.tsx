import React from 'react';

type HeadingProps = {
  children: string;
};

const Heading = (props: HeadingProps) => {
  return (
    <h2>
      {props.children}
    </h2>
  );
};

export default Heading;

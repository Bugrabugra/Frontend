import React from 'react';

type InputProps = React.ComponentProps<"input">;

const CustomInput = (props: InputProps) => {
  return (
    <input {...props}/>
  );
};

export default CustomInput;

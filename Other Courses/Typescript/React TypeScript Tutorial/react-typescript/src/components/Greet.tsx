import React from 'react';

type GreetProps = {
  name: string;
  messageCount?: number;
  isLoggedIn: boolean;
};

const Greet = (props: GreetProps) => {
  const { messageCount = 0 } = props;

  return (
    <div>
      <h2>
        {props.isLoggedIn
          ? `Welcome ${props.name} You have ${props.messageCount} unread messages`
          : "Welcome Guest"
        }
      </h2>
    </div>
  );
};

export default Greet;

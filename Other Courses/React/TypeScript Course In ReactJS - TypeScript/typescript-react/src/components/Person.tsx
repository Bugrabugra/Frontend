import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { AppContext } from "../App";

export enum HairColor {
  Blonde = "Your hair is blonde, good for you",
  Brown = "Cool hair color",
  Pink = "Wow pink!"
}

interface Props {
  name: string;
  age: number;
  email: string;
  hairColor: HairColor
}

type NameType = "Pedro" | "Jack";

const Person: FC<Props> = ({ name, age, email, hairColor }) => {
  const context = useContext(AppContext);
  const [country, setCountry] = useState<string | null>("");
  const nameForType: NameType = "Jack";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <h1>{name}</h1>
      <h1>{email}</h1>
      <h1>{age}</h1>
      <input
        type="text"
        placeholder="Write down your country..."
        onChange={handleChange}
      />
      <div>
        {country}
      </div>
      <div>
        {hairColor}
      </div>
      <div>
        {context?.isMarried ? "true" : "false"}
      </div>
    </div>
  );
};

export default Person;

import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";
import { useState } from "react";
import List from "./components/List";

function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <Heading title="Hello"/>
      <Section title="Different title">This is my section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List
        items={["Coffee", "Tacos", "Code"]}
        render={(item: string) => <span className="gold">{item}</span>}
      />
    </>

  )
}

export default App

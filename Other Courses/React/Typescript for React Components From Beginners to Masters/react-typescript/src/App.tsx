import './App.css'
import React, { ReactElement, ReactNode, useState } from "react";

// conventional props
const Heading = ({ title }: { title: string; }) => {
  return (
    <h1>{title}</h1>
  )
};

const HeadingWithContent = ({ children }: { children: ReactNode; }): ReactElement => {
  return (
    <h1>{children}</h1>
  )
};

// default props
const defaultContainerProps = {
  heading: <strong>My Heading</strong>
};

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

const Container = ({ heading, children }: ContainerProps): ReactElement => {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  )
};

Container.defaultProps = defaultContainerProps;

// functional props
const TextWithNumber = ({
                          header,
                          children
                        }: { header?: (num: number) => ReactNode, children: (num: number) => ReactNode }) => {
  const [state, setState] = useState<number>(1);

  return (
    <div>
      <h2>{header?.(state)}</h2>
      <div>{children(state)}</div>
      <div>
        <button onClick={() => setState(state + 1)}>Add</button>
      </div>
    </div>
  )
};

// list
function List<ListItem>({ items, render }: { items: ListItem[], render: (item: ListItem) => ReactNode }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  )
}

// class component
class MyHeader extends React.Component<{ title: ReactNode }> {
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

const App = () => {
  return (
    <div>
      <Heading title="Hello"/>
      <HeadingWithContent>
        <strong>hi!</strong>
      </HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber>
        {(num: number) => <div>Today's number {num}</div>}
      </TextWithNumber>
      <List items={["Jack", "Sadie", "John"]} render={(item: string) => <div>{item.toLowerCase()}</div>}/>
      <MyHeader title={<div>Test</div>}/>
    </div>
  )
}

export default App

import React from 'react';

type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

const List = <T extends { id: number, first: string, last: string }>({
  items,
  onClick
}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, index) => {
        return (
          <div key={item.id} onClick={() => onClick(item)}>
            {typeof item === "object" ? item.first : item}
          </div>
        )
      })}
    </div>
  );
};

export default List;

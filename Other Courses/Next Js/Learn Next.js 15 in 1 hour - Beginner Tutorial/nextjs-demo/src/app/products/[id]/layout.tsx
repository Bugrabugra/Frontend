const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <div>
        <h2>Featured products section</h2>
      </div>
    </div>
  );
};

export default ProductLayout;

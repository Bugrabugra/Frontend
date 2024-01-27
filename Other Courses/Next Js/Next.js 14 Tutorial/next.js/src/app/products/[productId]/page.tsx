import { Metadata } from "next";

type Props = {
  params: {
    productId: string
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Product ${params.productId}`
  }
}

const ProductDetails = ({ params }: Props) => {
  return (
    <div>
      Details about {params.productId}
    </div>
  );
};

export default ProductDetails;

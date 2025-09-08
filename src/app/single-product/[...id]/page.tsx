import SingleProduct from "@/components/single-product";
import top_product from "@/data/top_product";

export async function generateStaticParams() {
  // Create params for each product in your dataset
  return top_product.map((product) => ({
    id: [String(product.id)], // catch-all param must be an array
  }));
}

export default function SingleProductPage({ params }: { params: { id: string[] } }) {
  const productId = params.id[0]; // since it's [...id], take first
  const single_product = top_product.find(
    (item) => Number(item.id) === Number(productId)
  );

  if (!single_product) {
    return <div>Product not found</div>;
  }

  return <SingleProduct product={single_product} key={single_product.id} />;
}


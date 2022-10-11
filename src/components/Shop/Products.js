import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Get Products
      const response = await fetch('https://dummyjson.com/products');
      let data = await response.json();
      data = data.products;

      let transformedData = data.map((prod) => {
        const object = {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          description: prod.description,
        };
        return object;
      });

      transformedData = transformedData.splice(0, 9);
      setProducts(transformedData);
    };

    getData();
  }, []);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

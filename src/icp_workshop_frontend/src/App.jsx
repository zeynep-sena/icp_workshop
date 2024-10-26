import { useState } from 'react';
import { icp_workshop_backend } from 'declarations/icp_workshop_backend';

function App() {
  const [addProduct, setAddProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    motoko_project_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  function handleAddProduct(event) {
    event.preventDefault();
    const pname = event.target.elements.pname.value;
    const pprice = BigInt(event.target.elements.pprice.value);
    const pdescription = event.target.elements.pdescription.value;
    icp_workshop_backend.addProduct(pname, pprice, pdescription).then((addProduct) => {
      setAddProduct(addProduct);
    });
    return false;
  }


  async function getProducts() {
    try {
      const productList = await icp_workshop_backend.getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error geting products:', error);
    }
  }


  return (
    <main>
        <img src="/logo2.svg" alt="DFINITY logo" />
        <br />
        <br />
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">{greeting}</section>
      
      <div>
        <form action='#' onSubmit={handleAddProduct}>
          <div>
            <label htmlFor="name">Product name: &nbsp;</label>
            <input id="pname" alt="Product Name" type="text" /><br />
          </div>
          <div>
            <label htmlFor="name">Product price: &nbsp;</label>
            <input id="pprice" alt="Product Price" type="number" /><br />
          </div>
          <div>
            <label htmlFor="name">Product description: &nbsp;</label>
            <input id="pdescription" alt="Product Description" type="text" /><br />
          </div>
          <div>
            <button type='submit'>Add Product</button>
          </div>
        </form>
        <section id="addProduct">{addProduct}</section>
      </div>

      <div>
        <button onClick={getProducts}>Show Products</button>
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <p>{product.name}: ${product.price.toString()} - {product.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;

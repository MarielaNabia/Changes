import { createSignal, onCleanup, onMount, createEffect, createMemo } from 'solid-js';
import { IProduct } from './interface/iproduct';
import { ICategory } from '../category/interface/icategory';
//import { Category } from '../category/Category';

import styles from './product.module.css';


const Product = ()  => {
  const [product, setProduct] =createSignal<{ data: IProduct[] }>({ data: [] })
  const [isLoading, setIsLoading] = createSignal(true); // Variable de estado para indicar si los datos se están cargando
  const [categories, setCategories] = createSignal<{ data: ICategory[] }>({ data: [] });
  
  const [categoryId, setCategoryId] = createSignal<number | undefined>(undefined);


  const fetchData = async () => {
    try {
      // Realiza la solicitud GET a la API para obtener los productos
      const productResponse = await fetch('http://localhost:8090/api/products');
      const productData = await productResponse.json();
      setProduct(productData) 
      setIsLoading(false);
      console.log(product().data) 
      
      const categoryResponse = await fetch('http://localhost:8090/api/categories');
      const categoryData = await categoryResponse.json();
      setCategories(categoryData);
      console.log(categories().data)

      setIsLoading(false);

    } catch (error) {
      console.error('Error al obtener los datos:', error); 
      setIsLoading(false);
    }
  };

  
  onCleanup(() => {
    console.log('Componente Product desmontado. Cancelando solicitudes...');
  });

  onMount(() => {
    fetchData();
  });

  createEffect(() => {
    if (product().data.length > 0 && categories().data.length > 0) {
      setIsLoading(false);
    }
  });

 
  const getCategoryTitle = (categoryId: number): string => {
    const category = categories().data.find((c: ICategory) => c.id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  return (
    <div class={styles.content}>  
    <ul class={styles.productList}>
      {product().data.map((p: IProduct) => (
        
        <li>
          <div class={styles.card}>
          <h3 class={styles.title}>Description: {p.title}</h3>
             <p class={styles.description}><strong>Price:</strong> {p.price}</p>
             <p class={styles.description}><strong>Category:</strong> {getCategoryTitle(p.category.id)}</p> 
          </div>
        </li>         
        ))}
      </ul>  
    </div>
  );
};

export default Product;


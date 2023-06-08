import { createSignal, onCleanup, onMount, createEffect } from 'solid-js';
import { ICategory } from '../category/interface/icategory';
//import Product from '../product/Product';
import styles from './category.module.css';

const Category = () => {
  const [categories, setCategories] =createSignal<{ data: ICategory[] }>({ data: [] })
  const [isLoading, setIsLoading] = createSignal(true);

  const fetchData = async () => {
    try {
      // Realiza la solicitud GET a la API para obtener las categorías
      const categoryResponse = await fetch('http://localhost:8090/api/categories');
      const categoryData = await categoryResponse.json();
      setCategories(categoryData);
      console.log(categories())

    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setIsLoading(false);
    }
  };

  onCleanup(() => {
    console.log('Componente Product desmontado. Cancelando solicitudes...');
  });

  onMount(fetchData);

  createEffect(() => {
    if (categories().data.length > 0) {
      // Los datos están disponibles, se activa la renderización
      setIsLoading(false);    
    }
    console.log(categories());
    console.log(isLoading()) ;
  });
  return (
    <div class={styles.content}> 
    {/* //<Product categories={categories().data} /> */}

    <ul class={styles.productList}>
          {categories().data.map((c: ICategory, index: number) => (
            <li>
            <div class={styles.card}>
            <h3 class={styles.title}>Category: {c.title}</h3>
          </div>
          </li>
          ))}
        </ul>
        

    </div>
  );
};

export default Category;

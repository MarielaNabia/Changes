import { Component } from 'solid-js';
import Product from '../../features/product/Product';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';

const ProductPage: Component = () =>
{
    return (
        <PrivateLayout>
            <Product/>
        </PrivateLayout>
    );
};

export default ProductPage;
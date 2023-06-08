import { Component } from 'solid-js';
import Category from '../../features/category/Category';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';

const CategoryPage: Component = () =>
{
    return (
        <PrivateLayout>
            <Category/>
        </PrivateLayout>
    );
};

export default CategoryPage;
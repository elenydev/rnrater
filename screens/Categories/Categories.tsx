import AuthProvider from '../../components/Auth/AuthProvider/AuthProvider';
import * as React from 'react';
import CategoriesList from '../../components/Categories/Categories/Categories';

export default function Categories () {
  return (
    <AuthProvider>
      <CategoriesList />
    </AuthProvider>
  );
}

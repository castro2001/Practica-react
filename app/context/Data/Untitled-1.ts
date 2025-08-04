// ~/context/ApiContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useApiLogic } from '~/logic/useApiLogic';

// Tipo del contexto (inferido automáticamente de useApiLogic)
type IApiContextType = ReturnType<typeof useApiLogic>;

const ApiContext = createContext<IApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi debe ser usado dentro de ApiProvider");
  }
  return context;
};

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const logic = useApiLogic();

  useEffect(() => {
    // Cargar categorías al inicializar (se usan en muchos lugares)
    logic.getCategories();
  }, [logic.getCategories]);

  // Opcional: Log para debugging (solo en desarrollo)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API State:', {
        productsCount: logic.products.length,
        categoriesCount: logic.categories.length,
        loading: {
          products: logic.productsLoading,
          categories: logic.categoriesLoading,
          product: logic.productLoading
        },
        errors: {
          products: logic.productsError,
          categories: logic.categoriesError,
          product: logic.productError
        }
      });
    }
  }, [
    logic.products.length,
    logic.categories.length,
    logic.productsLoading,
    logic.categoriesLoading,
    logic.productLoading,
    logic.productsError,
    logic.categoriesError,
    logic.productError
  ]);

  return (
    <ApiContext.Provider value={logic}>
      {children}
    </ApiContext.Provider>
  );
};
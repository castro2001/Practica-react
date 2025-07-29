import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

export const DataPaginator = (props: IDataPaginator)=> {
  
  return (
    <>
      <div className="flex items-center justify-between mt-6 px-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{' '}
            <span className="font-medium">20</span> elementos
          </p>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>
            
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  // onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                    // currentPage === page
                      // ? 'bg-blue-600 text-white shadow-sm'
                       'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
    </>
    
  );
}
import { Clock, MoreHorizontal, Star } from 'lucide-react';
import React, { useState } from 'react';

export const DataBody = (props: IDataBody)=> {
  

  return (
    <>
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* {filteredData.map((item, index) => ( */}
            <div
            
              className={'group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 '}
            >
              <div className={`flex items-start space-x-4 `}>
                {/* Enhanced Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    // checked={selectedItems.includes(item.id)}
                    // onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>

                {/* Enhanced Star Button */}
                <button
                  // onClick={() => toggleStar(item.id)}
                  className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                
                       'text-yellow-500 hover:text-yellow-600'
                  }`}
                >
                  <Star className={`w-5 h-5  ? 'fill-current' : ''}`} />
                </button>

                {/* Enhanced Product Image */}
                <div className="flex-shrink-0">
                  <div className={'bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center'}>
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full `}>
                        tcategory
                      </span>
                  
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full">
                          item.badge
                        </span>
                      
                      
                        <div className="w-2 h-2 bg-blue-600 rounded-full">hhhh</div>
                      
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        000
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* <h3 className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 ${
                    !item.isRead ? 'font-bold' : 'font-medium'
                  } ${viewMode === 'comfortable' ? 'text-base' : 'text-sm'}`}>
                    {item.title}
                  </h3> */}
                  
                  {/* <p className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${
                    viewMode === 'comfortable' ? 'text-sm' : 'text-xs'
                  }`}>
                    {item.description}
                  </p> */}
                </div>
              </div>
            </div>
          {/* ))} */}
        </div>
    </>
    
  );
}
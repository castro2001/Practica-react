import React from 'react';

import {Loader2} from "lucide-react"

export const Preloader = ()=>{

    return (
        <div className="flex items-center justify-center h-screen py-10 shadow-2xs  bg-white dark:bg-dark">
            <div className="container">
                <div className=" flex items-center rounded-md  bg-white shadow  dark:bg-dark-2 p-5 pl-8">
                <div className="flex items-center justify-center">
                         <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
                <div className=" flex w-full items-center justify-between">
                    <p className="text-gray-600 ">Cargando Mensaje...</p>
                </div>
                </div>
            </div>
        </div>
    )


}

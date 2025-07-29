import React, {useState,useEffect} from "react";
{/* // Interfaces para el hook múltiple */}
interface MultipleFetchResult<T> {
    results: (T | undefined)[];
    isLoading: boolean;
    errors: (Error | undefined)[];
}

{/* // Hook alternativo para múltiples URLs */}
export const useMultipleFetch = <T = any>(urls: string[] = []): MultipleFetchResult<T> => {
    const [results, setResults] = useState<(T | undefined)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<(Error | undefined)[]>([]);

    useEffect(() => {
        if (!urls.length) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        
        Promise.allSettled<T>(
            urls.map(url => fetch(url).then(res => res.json()))
        ).then(results => {
            const data: (T | undefined)[] = [];
            const errs: (Error | undefined)[] = [];
            
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    data[index] = result.value;
                } else {
                    errs[index] = result.reason;
                }
            });
            
            setResults(data);
            setErrors(errs);
            setIsLoading(false);
        });
    }, [JSON.stringify(urls)]);

    return { results, isLoading, errors };
};
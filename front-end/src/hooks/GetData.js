import React, { useState, useEffect } from 'react';

export const useGetData = (URL) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate'
            },
            credentials: 'include'
        });
        try {
            const status = response.status;
            if (status === 401) {
                const data = null;
                const result = { 'status': status, 'data': data };
                setIsLoading(false);
                setData(result)
            } else {
                const data = await response.json();
                const result = { 'status': status, 'data': data };
                setIsLoading(false);
                setData(result)
            }
        }
        catch (e) {
            setIsLoading(false);
        }
    }

    useEffect(async () => {
        await fetchData();
    }, []);

    return [isLoading, data];
}

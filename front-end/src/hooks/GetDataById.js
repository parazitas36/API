import React, { useState, useEffect } from 'react';

export const useGetDataById = (URL, id, states) => {
    const fetchData = async () => {
        states.setIsLoading(true);
        const response = await fetch(URL + id, {
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
                states.setIsLoading(false);
                states.setData(result)
            } else {
                const data = await response.json();
                const result = { 'status': status, 'data': data };
                states.setIsLoading(false);
                states.setData(result)
            }
        }
        catch (e) {
            states.setIsLoading(false);
        }
    }

    useEffect(async () => {
        await fetchData();
    }, []);
}

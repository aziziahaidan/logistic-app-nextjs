import { toast } from 'react-toastify';

export async function fetchApi(url: string, options: RequestInit = {}) {
    try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
            toast.error('Error fetching data.');
        }

        const data = await resp.json();
        return data;
    } catch (e) {
        console.log(e);
        toast.error('Error fetching data.');
        return null;
    }
}
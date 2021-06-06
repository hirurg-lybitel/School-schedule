import * as myConst from '../constansts';

//const ApiService = () => {
export default () => {
    const _apiBase = myConst.BASE_URL;

    const _headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    return {
        getResource: async (url: string) => {
            const res = await fetch(`${_apiBase}${url}`);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, received ${res.status}`);
            }

            console.log('getResource', res);
            const status = res.status;
            const body = await res.json();
            return { status, body };
        },
        postResource: async (url: string, sendBody = {}) => {
            const res = await fetch(`${_apiBase}${url}`, {
                method: 'POST',
                headers: _headers,
                body: JSON.stringify(sendBody),
            });
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, received ${res.status}`);
            }

            const status = res.status;
            const body = await res.json();
            return { status, body };
        },
        patchResource: async (url: string, sendBody = {}) => {
            const res = await fetch(`${_apiBase}${url}`, {
                method: 'PATCH',
                headers: _headers,
                body: JSON.stringify(sendBody),
            });
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, received ${res.status}`);
            }

            const status = res.status;
            const body = await res.json();
            return { status, body };
        },
        deleteResourse: async (url: string) => {
            const res = await fetch(`${_apiBase}${url}`, { method: 'DELETE' });
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, received ${res.status}`);
            }
            const status = res.status;
            const body = await res.json();
            return { status, body };
        },
    };
};

//export default ApiService;

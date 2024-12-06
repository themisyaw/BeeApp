export class BaseAPI {
    constructor() {
        this.apiRoot = beeAppData.root_url; 
        this.nonce = beeAppData.nonce; 
       
    }

    async fetchData(endpoint, method = 'GET', body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'X-WP-Nonce': this.nonce,
        };
        
        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        };
        try {
            const response = await fetch(`${this.apiRoot}${endpoint}`, options);
            return await response.json();
        } catch (error) {
            console.error('Error with API request:', error);
        }
    }

    get(endpoint) {
        return this.fetchData(endpoint);
    }

    post(endpoint, data) {
        return this.fetchData(endpoint, 'POST', data);
    }

    delete(endpoint) {
        return this.fetchData(endpoint, 'DELETE');
    }

    update(endpoint, data) {
        return this.fetchData(endpoint, 'PUT', data);
    }
}
import { BaseAPI } from './apiRequests.js';

export class beeAppListBase extends BaseAPI {
    constructor() {
        super();
        this.endpoint = '/wp-json/userBeehives/v1'; // Custom Post Type endpoint
    }

    async getBeehives() {
        return await this.get('/wp-json/userBeehives/v1/beehives?per_page=100');
    }

    async getBeehivesForFeed() {
        return await this.get('/wp-json/userBeehives/v1/beehivesForFeed?per_page=100');
    }

    async addBeehive(item) {
        return await this.post('/wp-json/beehives/v1/create', item);
    }
    async saveBeehive(item) {
        return await this.post('/wp-json/beehives/v1/save', item);
    }

    async deleteBeehive(itemId) {
        return await this.delete('/wp-json/beehives/v1/delete',itemId);
    }
    async searchBeehives(beehiveNumber) {
        return await this.get(`/wp-json/beehives/v1/search/${beehiveNumber}`);
    }

}
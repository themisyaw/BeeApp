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
        return await this.post('/wp-json/beehives/v1/save', item);
    }

    // async deleteBeehive(itemId) {
    //     return await this.delete(`${this.endpoint}/${itemId}`);
    // }

    // async updateBeehive(itemId, updatedData) {
    //     return await this.update(`${this.endpoint}/${itemId}`, updatedData);
    // }
}
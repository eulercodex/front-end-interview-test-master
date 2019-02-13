import axios from 'axios';

class API {
    constructor() {
        this._api = axios.create({ baseURL: 'http://localhost:8001' });
    }

    getLocations(option = {}) {
        const {
            minBed,
            maxBed,
            minBath,
            maxBath,
            buildingTypeFilter,
            page,
            limit
        } = option;

        const config = { 
            url: '/',
            params: {}
        };
        
        if(minBed && minBed !== '') config.params.beds_gte = minBed;
        if(maxBed && maxBed !== '') config.params.beds_lte = maxBed;
        if(minBath && minBath !== '') config.params.baths_gte = minBath;
        if(maxBath && maxBath !== '') config.params.baths_lte = maxBath;
        if(page) config.params._page = page;
        if(limit) config.params._limit = limit;

        if(buildingTypeFilter && Array.isArray(buildingTypeFilter) && buildingTypeFilter.length > 0) {
            const vector = [];
            for(const filter of buildingTypeFilter) {
                vector.push(filter)
            }
            config.params['buildingType.id'] = vector
        }
        return this._api.get('locations', config);
    }

    getLocation(id) {
        return this._api.get(`locations/${id}`);
    }

    getBuildingTypes() {
        return this._api.get('buildingtypes');
    }
}

export default new API();

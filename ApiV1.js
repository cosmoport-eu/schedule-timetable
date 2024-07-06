const defaultUrl = 'http://127.0.0.1:8080';
const defaultHttpHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const eventStatus = {
    CANCELED: 1,
    BOARDING: 2,
    DEPARTED: 3,
    RETURN: 4,
    RETURNED: 5,
    PREORDER: 6,
};

export const eventState = {
    OPENED: 1,
    CLOSED: 2,
};

/**
 * Parses Json value from a network request.
 *
 * @param {object} response The response object from a network request.
 * @return {Promise} promise The parsed Json value, wrapped into a promise.
 */
const parseJson = (response) =>
    new Promise((resolve) =>
        response
            .json()
            .then((json) =>
                resolve({status: response.status, ok: response.ok, json}),
            ),
    );

/**
 * The main HTTP API v1 client.
 *
 * @since 0.1.0
 */
export default class ApiV1 {
    constructor(url) {
        this.address = url || defaultUrl;

        /**
         * Makes a requests to the API endpoint with some options.
         *
         * @param {string} uri A endpoint URI (like `/something`).
         * @param {object} options The options to pass to fetch.
         *
         * @return {Promise} The request promise.
         */
        this.request = (uri, options) =>
            new Promise((resolve, reject) => {
                fetch(this.address + uri, Object.assign({}, options, {mode: 'cors'}))
                    .then((response) => parseJson(response))
                    .then((response) =>
                        response.ok ? resolve(response.json) : reject(response.json),
                    )
                    .catch((error) =>
                        reject({code: error.code, message: error.message}),
                    );
            });

        /**
         * Makes HTTP GET request to the API endpoint.
         *
         * @param {string} uri A endpoint URI.
         *
         * @return {Promise} The request promise.
         */
        this.get = (uri) =>
            this.request(uri, {method: 'GET', headers: defaultHttpHeaders});

        /**
         * Makes HTTP POST request to the API endpoint.
         *
         * @param {string} uri A endpoint URI.
         * @param {object} data Data values to pass in the request body.
         *
         * @return {Promise} The request promise.
         */
        this.post = (uri, data) =>
            this.request(uri, {
                method: 'POST',
                headers: defaultHttpHeaders,
                body: JSON.stringify(data),
            });

        /**
         * Makes HTTP DELETE request to the API endpoint.
         *
         * @param {string} uri A endpoint URI.
         *
         * @return {Promise} The request promise.
         */
        this.delete = (uri) =>
            this.request(uri, {method: 'DELETE', headers: defaultHttpHeaders});
    }

    // Events
    fetchEvents = () => this.get('/timetable');
    fetchEventsPage = (page, count) =>
        this.get(`/timetable/all?page=${page}&count=${count}`);
    fetchTimetable = () => this.fetchEvents();
    fetchEventsByIdForGate = (id) =>
        this.get(`/timetable/byIdAndOneAfter?id=${id}`);
    fetchEventsInRange = (start, end) =>
        this.get(`/timetable?date=${start}&date2=${end}`);
    createEvent = (data) => this.post('/timetable', data);
    updateEvent = (data) => this.post('/timetable/update/event', data);
    deleteEvent = (id) => this.delete(`/timetable/${id}`);

    // Translations
    fetchTranslations = () => this.get('/translations');
    fetchTranslationsForLocale = (localeId) =>
        this.get(`/translations/localeId=${localeId}`);
    updateTranslationTextForId = (id, value) => this.post(`/translations/update/${id}`, value);
    fetchLocales = () => this.get('/translations/locales');
    fetchVisibleLocales = () => this.get('/translations/locales/visible');
    createLocale = (data) => this.post('/translations/locale', data);
    updateLocaleShowData = (locale) =>
        this.post('/translations/locale/show', locale);

    // References
    fetchReferenceData = () => this.get('/t_events/reference_data');
    createEventType = (data) => this.post('/t_events/types', data);
    deleteEventType = (id) => this.delete(`/t_events/types/${id}`);
    createEventTypeCategory = (data) =>
        this.post('/t_events/types/categories', data);

    // Facilities
    fetchAllFacilities = () => this.get('/facility/all');
    fetchFacilitiesByLocaleId = (localeId) => this.get(`/facility/${localeId}`);
    createFacility = (localeId, data) => this.post(`/facility/${localeId}`, data);
    updateFacility = (id, data) => this.post(`/facility/${id}`, data);
    updateFacilityIcon = (id, data) => this.post(`/facility/${id}/icon`, data);
    deleteFacility = (id) => this.delete(`/facility/${id}`);

    // Materials
    fetchAllMaterials = () => this.get('/material/all');
    fetchMaterialsByLocaleId = (localeId) => this.get(`/material/${localeId}`);
    createMaterial = (localeId, data) => this.post(`/material/${localeId}`, data);
    updateMaterial = (id, data) => this.post(`/material/${id}`, data);
    updateMaterialIcon = (id, data) => this.post(`/material/${id}/icon`, data);
    deleteMaterial = (id) => this.delete(`/material/${id}`);

    // Nodes
    fetchNodes = () => this.get('/nodes');

    // Gates
    fetchGates = () => this.get('/gates');

    // Server
    fetchTime = () => this.get('/time');

    // Settings
    fetchSettings = () => this.get('/settings');
    updateSettingValueForId = (id, value) =>
        this.post(`/settings/update/${id}`, value);

    // Proxy
    proxy = (data) => this.post('/proxy', data);

    // Auth
    authWith = (password) => this.post('/auth/check', password);
    authSetPass = (password) => this.post('/auth/set', password);
}

export namespace eventStatus {
    let CANCELED: number;
    let BOARDING: number;
    let DEPARTED: number;
    let RETURN: number;
    let RETURNED: number;
    let PREORDER: number;
}
export namespace eventState {
    let OPENED: number;
    let CLOSED: number;
}
/**
 * The main HTTP API v1 client.
 *
 * @since 0.1.0
 */
export default class ApiV1 {
    constructor(url: any);

    address: any;
    /**
     * Makes a requests to the API endpoint with some options.
     *
     * @param {string} uri A endpoint URI (like `/something`).
     * @param {object} options The options to pass to fetch.
     *
     * @return {Promise} The request promise.
     */
    request: (uri: string, options: object) => Promise<any>;
    /**
     * Makes HTTP GET request to the API endpoint.
     *
     * @param {string} uri A endpoint URI.
     *
     * @return {Promise} The request promise.
     */
    get: (uri: string) => Promise<any>;
    /**
     * Makes HTTP POST request to the API endpoint.
     *
     * @param {string} uri A endpoint URI.
     * @param {object} data Data values to pass in the request body.
     *
     * @return {Promise} The request promise.
     */
    post: (uri: string, data: object) => Promise<any>;
    /**
     * Makes HTTP DELETE request to the API endpoint.
     *
     * @param {string} uri A endpoint URI.
     *
     * @return {Promise} The request promise.
     */
    delete: (uri: string) => Promise<any>;
    fetchEvents: () => Promise<any>;
    fetchEventsPage: (page: any, count: any) => Promise<any>;
    fetchTimetable: () => Promise<any>;
    fetchEventsByIdForGate: (id: any) => Promise<any>;
    fetchEventsInRange: (start: any, end: any) => Promise<any>;
    createEvent: (data: any) => Promise<any>;
    updateEvent: (data: any) => Promise<any>;
    deleteEvent: (id: any) => Promise<any>;
    fetchTranslations: () => Promise<any>;
    fetchTranslationsForLocale: (localeId: any) => Promise<any>;
    updateTranslationTextForId: (id: any, value: any) => Promise<any>;
    fetchLocales: () => Promise<any>;
    fetchVisibleLocales: () => Promise<any>;
    createLocale: (data: any) => Promise<any>;
    updateLocaleShowData: (locale: any) => Promise<any>;
    fetchReferenceData: () => Promise<any>;
    createEventType: (data: any) => Promise<any>;
    deleteEventType: (id: any) => Promise<any>;
    createEventTypeCategory: (data: any) => Promise<any>;

    fetchAllFacilities = () => Promise<any>;
    fetchFacilitiesByLocaleId = (localeId: any) => Promise<any>;
    createFacility = (localeId: any, data: any) => Promise<any>;
    updateFacility = (id: any, data: any) => Promise<any>;
    deleteFacility = (id: any) => Promise<any>;

    fetchAllMaterials = () => Promise<any>;
    fetchMaterialsByLocaleId = (localeId: any) => Promise<any>;
    createMaterial = (localeId: any, data: any) => Promise<any>;
    updateMaterial = (id: any, data: any) => Promise<any>;
    deleteMaterial = (id: any) => Promise<any>;

    fetchNodes: () => Promise<any>;
    fetchGates: () => Promise<any>;
    fetchTime: () => Promise<any>;
    fetchSettings: () => Promise<any>;
    updateSettingValueForId: (id: any, value: any) => Promise<any>;
    proxy: (data: any) => Promise<any>;
    authWith: (password: any) => Promise<any>;
    authSetPass: (password: any) => Promise<any>;
}

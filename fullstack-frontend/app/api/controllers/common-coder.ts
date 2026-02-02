import { $api, config } from "../index";

export const createData = (body: ) => {
    return $api.post(`/api/data/`, body, { headers: config() });
}
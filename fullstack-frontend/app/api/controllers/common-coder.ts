import { $api, config } from "../index";

export const createData = (body: string) => {
    return $api.post(`/api/coder/`, body, { headers: config() });
}
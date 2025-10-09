import { $api, config } from "../index";
import { dataMain } from "../../types/common.type";


export const getData = () => {
    return $api.get('/api/data/', { headers: config() });
}

export const getDataId = (id: number) => {
    return $api.get(`/api/data/${id}`, { headers: config() });
}
export const createData = (body: dataMain) => {
    return $api.post(`/api/data/`, body, { headers: config() });
}

export const editDataId = (id: number, body: dataMain) => {
    return $api.put(`/api/data/${id}`, body, { headers: config() });
}

export const deleteDataId = (id: number) => {
    return $api.delete(`/api/data/${id}`, { headers: config() });
}
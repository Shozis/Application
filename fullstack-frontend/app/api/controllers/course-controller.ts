import { $api, config } from "../index";
import { dataL, dataD } from "../../types/course.type";

type dataDto = {
    name: string,
    age: number
}

export const getCourse = () => {
    return $api.get('/api/course/', { headers: config() });
}

export const getCourseId = (id: number) => {
    return $api.get(`/api/course/${id}`, { headers: config() });
}

export const createCourse = (data: dataDto) => {
    return $api.post(`/api/course/`, data , { headers: config() });
}

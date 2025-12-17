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

export const createCourse = (body: dataD) => {
    return $api.post(`/api/course/`, body , { headers: config() });
}

export const editCourseId = (id: number, data: dataD) => {
    return $api.put(`/api/course/${id}`, data, { headers: config() });
}

export const deleteCourseId = (id: number) => {
    return $api.delete(`/api/course/${id}`, { headers: config() });
}
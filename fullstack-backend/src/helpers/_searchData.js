
export const findId = (idSearch, arrayData) => {
    return arrayData.find((item) => item.id === parseInt(idSearch))
}

export const findIndexId = (idSearch, arrayData) => {
    return arrayData.findindex((item) => item.id === parseInt(idSearch))
}
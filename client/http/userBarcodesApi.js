import {$host} from "./index";

export const createUserBarcodes = async (formData, userId) => {
    const body = {
        productsValues: formData.productsValues,
        date: formData.date
    }
    return await $host.post(`api/user_code/user/${+userId}/`, body)
}

export const fetchAllUsersBarcodes = async () => {
    const {data} = await $host.get('api/user_code')
    return data
}

import {$host} from "./index";

export const createBarcode = async (barcode) => {
    const body = {
        startNumber: barcode.name,
        keyNumber: barcode.keyNumber,
        outputSequence: barcode.outputSequence,
        SHKCode32: barcode.SHKCode32,
        codedNumber: barcode.codedNumber,
        info: barcode.info
    }
    return await $host.post(`/api/barcode`, body)
}

export const fetchBarcodes = async () => {
    const {data} = await $host.get('api/barcode')
    return data
}

export const fetchOneBarcodeByNum = async (startNumber) => {
    return await $host.get(`api/barcode/${startNumber}/`)
}

export const fetchBarcodeInfo = async (id) => {
    return await $host.get(`api/barcode/${+id}/`)
}

import {makeAutoObservable} from "mobx";

export default class BarcodeStore {
    constructor() {
        this._barcodes = []
        this._barcodesInfo = []
        makeAutoObservable(this)
    }

    setBarcode(barcodes) {
        this._barcodes = barcodes
    }

    setBarcodesInfo(info) {
        this._barcodesInfo = info
    }

    get getBarcodes() {
        return this._barcodes
    }
    get getBarcodesInfo() {
        return this._barcodesInfo
    }

}

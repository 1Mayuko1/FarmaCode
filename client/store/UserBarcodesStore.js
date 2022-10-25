import {makeAutoObservable} from "mobx";

export default class UserBarcodesStore {

    constructor() {
        this._userBarcodes = []
        makeAutoObservable(this)
    }

    setUserCodes(userBarcodes) {
        this._userBarcodes = userBarcodes
    }

    get getUserCodes() {
        return this._userBarcodes
    }
}

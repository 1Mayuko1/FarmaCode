import React, {createContext} from 'react';
import { LogBox } from "react-native";
import UserStore from './store/UserStore'
import UserBarcodesStore from "./store/UserBarcodesStore";
import BarcodeStore from "./store/BarcodeStore";
import AppContainer from "./AppContainer";

LogBox.ignoreLogs([""]);
export const Context = createContext(null)

export default function App() {

  return (
      <Context.Provider value={{
        user: new UserStore(),
        userBarcodes: new UserBarcodesStore(),
        barcodes: new BarcodeStore()
      }}>
        <AppContainer />
      </Context.Provider>
  );
}

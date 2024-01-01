// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import {smartyAutoCompleteAddressSlice, getPermitValidationSlice} from '../../slices/smartyAutoCompleteAddressSlice.slice';
import {savePropertySlice } from '../../slices/propertySlice.slice';

// ==============================|| COMBINE REDUCERS ||============================== //
const smartyAutoCompleteAddress = smartyAutoCompleteAddressSlice.reducer
const getPermitValidation = getPermitValidationSlice.reducer
const saveProperty = savePropertySlice.reducer

const reducers = combineReducers(
    { 
        menu,
        smartyAutoCompleteAddress,
        getPermitValidation,
        saveProperty,
    }
);

export default reducers;

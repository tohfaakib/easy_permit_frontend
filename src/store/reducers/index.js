// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import {smartyAutoCompleteAddressSlice, getPermitValidationSlice} from '../../slices/smartyAutoCompleteAddressSlice.slice';

// ==============================|| COMBINE REDUCERS ||============================== //
const smartyAutoCompleteAddress = smartyAutoCompleteAddressSlice.reducer
const getPermitValidation = getPermitValidationSlice.reducer

const reducers = combineReducers(
    { 
        menu,
        smartyAutoCompleteAddress,
        getPermitValidation,
    }
);

export default reducers;

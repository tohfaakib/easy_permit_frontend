// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import smartyAutoCompleteAddressSlice from '../../slices/smartyAutoCompleteAddressSlice.slice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers(
    { 
        menu,
        smartyAutoCompleteAddressSlice,
    }
);

export default reducers;

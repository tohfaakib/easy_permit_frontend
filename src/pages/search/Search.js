import React from 'react';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Formik
import { useFormik } from 'formik';
// material-ui
import {Grid, } from '@mui/material';
import  SmartyAutocompleteAddress  from '../../components/SmartyAutocompleteAddress';
// project import
import MainCard from 'components/MainCard';
import { autoCompleteAddressSearchSchemaValidation } from '../../utils/formikSchemaValidation/autoCompleteAddressSearchSchemaValidation';
import {GetSmartyAutoCompleteAddress, GetPermitValidation} from '../../services/smartyAutoCompleteAddress.service';
import { nullifyAutoCompleteAddress } from "../../slices/smartyAutoCompleteAddressSlice.slice";

// ===============================|| COMPONENT - SEARCH ||=============================== //

const Search = () => {
  const { smartyAutoCompleteAddressList } = useSelector((state) => state.smartyAutoCompleteAddress)
  const { getPermitValidation } = useSelector((state) => state.getPermitValidation)
  
  // console.log(smartyAutoCompleteAddressList, autoCompleteAddressLoading, autoCompleteAddressError);
  console.log("getPermitValidation: ", getPermitValidation)

  const dispatch = useDispatch();

  // Initial value for Address auto search
  const createInitialValue = {
    address: null
  }

  // Formik Setup
  const formik = useFormik({
    initialValues: createInitialValue,
    validationSchema: autoCompleteAddressSearchSchemaValidation,
    onSubmit: (values) => {
      handelSubmit(values);
    },
    enableReinitialize: true,
  });

  // Handel Submit
  const handelSubmit = async (data) => {
    dispatch(GetSmartyAutoCompleteAddress(data));
  };

  // Call Smarty AutoComplete Address Front-End API OnInputChange
  const handelOnInputChangeSmartyAutoCompleteAddress = (event, address) => {
    if(address.length >=1){
      dispatch(GetSmartyAutoCompleteAddress(address));
    }
    dispatch(nullifyAutoCompleteAddress());
  }

  // Call Smarty AutoComplete Address Back-End validation API OnChange
  const handelOnChangeSmartyAutoCompleteAddress = (address) => {
    console.log("handelOnChangeSmartyAutoCompleteAddress: ", address?.value)
    // dispatch(nullifyAutoCompleteAddress());
    dispatch(GetPermitValidation(address));
  }

  
  return(
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={0} md={2}>

        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <MainCard title="Search Address">
            <form onSubmit={formik.handelSubmit}>
              <SmartyAutocompleteAddress 
                id="auto-complete"
                label='Search Address'
                data={smartyAutoCompleteAddressList}
                value={formik.values.address}
                onChange={(_, address) => {
                  formik.setFieldValue('address', address)
                  handelOnChangeSmartyAutoCompleteAddress(address);
                }}
                onInputChange={handelOnInputChangeSmartyAutoCompleteAddress}
              />
            </form>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={0} md={2}>

        </Grid>
      </Grid>
    </>
  )
};

export default Search;

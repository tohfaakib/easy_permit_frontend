import React  from 'react';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Formik
import { useFormik } from 'formik';
// material-ui
import { Grid, } from '@mui/material';
import  SmartyAutocompleteAddress  from '../../components/SmartyAutocompleteAddress';
import CustomButton from 'components/Button';
// project import
// import MainCard from 'components/MainCard';
import { autoCompleteAddressSearchSchemaValidation } from '../../utils/formikSchemaValidation/autoCompleteAddressSearchSchemaValidation';
import { GetSmartyAutoCompleteAddress, GetPermitValidation } from '../../services/smartyAutoCompleteAddress.service';
import { nullifyAutoCompleteAddress, nullifyPermitValidation } from "../../slices/smartyAutoCompleteAddressSlice.slice";

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
      console.log("on submit data in: ", values)
      handleSubmit_(values);
    },
    enableReinitialize: true,
  });

  // Handle Submit
  const handleSubmit_ = async (data) => {
    console.log("on submit data: ", data)
    await dispatch(GetPermitValidation(address));
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
    dispatch(nullifyPermitValidation());
    dispatch(GetPermitValidation(address));
  }

  
  return(
    <>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={0} md={2}></Grid>
        <Grid item xs={12} sm={12} md={8} >
          {/* <MainCard title="Search Address"> */}
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12} sm={12} md={12}>
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
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{textAlign: 'center', marginTop: '20px'}}>
                <p>{getPermitValidation?.data}</p>
                <CustomButton />
                {/* <button type='submit' name='search'>Search</button> */}
              </Grid>
            </form>
          {/* </MainCard> */}
        </Grid>
        <Grid item xs={12} sm={0} md={2}></Grid>
      </Grid>
    </>
  )
};

export default Search;

import React  from 'react';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Formik
import { useFormik } from 'formik';
// material-ui
import { Grid, } from '@mui/material';

import  SmartyAutocompleteAddress  from '../../components/SmartyAutocompleteAddress';
// import CustomButton from 'components/Button';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

// project import
// import MainCard from 'components/MainCard';
// import { autoCompleteAddressSearchSchemaValidation } from '../../utils/formikSchemaValidation/autoCompleteAddressSearchSchemaValidation';
import { GetSmartyAutoCompleteAddress, GetPermitValidation } from '../../services/smartyAutoCompleteAddress.service';
import { nullifyAutoCompleteAddress, 
  // nullifyPermitValidation 
} from "../../slices/smartyAutoCompleteAddressSlice.slice";

// ===============================|| COMPONENT - SEARCH ||=============================== //

const EasySearch = () => {
  const { smartyAutoCompleteAddressList } = useSelector((state) => state.smartyAutoCompleteAddress)
  const { getPermitValidation } = useSelector((state) => state.getPermitValidation)

  const dispatch = useDispatch();

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      address: null,
    },
    // validationSchema: autoCompleteAddressSearchSchemaValidation,
    onSubmit: (values) => {
      console.log("on submit data in: ", values)
      handleSubmit_(values);
    },
    enableReinitialize: true,
  });

  // Handle Submit
  const handleSubmit_ = async (data) => {
    console.log("on submit data: ", data)
    // dispatch(nullifyPermitValidation());
    await dispatch(GetPermitValidation(data?.address));
  };

  // Call Smarty AutoComplete Address Front-End API OnInputChange
  const handelOnInputChangeSmartyAutoCompleteAddress = (event, address) => {
    if(address.length >=5){
      dispatch(GetSmartyAutoCompleteAddress(address));
    }
    dispatch(nullifyAutoCompleteAddress());
  }

  // Call Smarty AutoComplete Address Back-End validation API OnChange
  // const handelOnChangeSmartyAutoCompleteAddress = (address) => {
  //   console.log("handelOnChangeSmartyAutoCompleteAddress: ", address?.value)
  //   dispatch(nullifyPermitValidation());
  //   dispatch(GetPermitValidation(address));
  // }

  
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
                    name='address'
                    value={formik.values.address}
                    onChange={(_, address) => {
                      formik.setFieldValue('address', address)
                      // handelOnChangeSmartyAutoCompleteAddress(address);
                    }}
                    onInputChange={handelOnInputChangeSmartyAutoCompleteAddress}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{textAlign: 'center', marginTop: '20px'}}>
                {/* <p>{getPermitValidation?.data?.message}</p> */}
                <Button type="submit" variant="outlined" color={getPermitValidation?.data?.success === true ? "success" : 'primary'} endIcon={<Search />}>
                   {getPermitValidation?.data?.success === true ? 'Get permit' : 'Submit'}
                </Button>
              </Grid>
            </form>
          {/* </MainCard> */}
        </Grid>
        <Grid item xs={12} sm={0} md={2}></Grid>
      </Grid>
    </>
  )
};

export default EasySearch;

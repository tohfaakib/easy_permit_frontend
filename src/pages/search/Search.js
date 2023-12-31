import React, {useEffect} from 'react';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Formik
import { useFormik } from 'formik';
// material-ui
// import * as Yup from 'yup';
import { TextField, Button, Grid, Paper, Typography, Container } from '@mui/material';

import  SmartyAutocompleteAddress  from '../../components/SmartyAutocompleteAddress';
// import CustomButton from 'components/Button';
import Search from '@mui/icons-material/Search';


// project import
// import MainCard from 'components/MainCard';
// import { autoCompleteAddressSearchSchemaValidation } from '../../utils/formikSchemaValidation/autoCompleteAddressSearchSchemaValidation';
import { GetSmartyAutoCompleteAddress, GetPermitValidation } from '../../services/smartyAutoCompleteAddress.service';
import { nullifyAutoCompleteAddress, 
  nullifyPermitValidation 
} from "../../slices/smartyAutoCompleteAddressSlice.slice";

// ===============================|| COMPONENT - SEARCH ||=============================== //

const EasySearch = () => {
  const { smartyAutoCompleteAddressList } = useSelector((state) => state.smartyAutoCompleteAddress)
  const { getPermitValidation } = useSelector((state) => state.getPermitValidation)

  const dispatch = useDispatch();
  console.log("response: ", getPermitValidation?.data?.message)
  console.log("property data: ", getPermitValidation?.data?.data)

  
  const createInitialValues = {
    climate_zone: '',
    full_street_address: '',
    unit: '',
    apn: '',
    owner: '',
    year_built: '',
    square_feet: '',
    lot_size: '',
    bedrooms: '',
    total_rooms: '',
  };
  
  const formikForm = useFormik({
    initialValues: createInitialValues,
    // validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  useEffect(() => {
    if (getPermitValidation?.data?.data) {
      formikForm.setValues({ ...createInitialValues, ...getPermitValidation?.data?.data });
    }
  }, [getPermitValidation?.data?.data,]);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      address: null,
    },
    // validationSchema: autoCompleteAddressSearchSchemaValidation,
    onSubmit: (values) => {
      handleSubmit_(values);
    },
    enableReinitialize: true,
  });

  // Handle Submit
  const handleSubmit_ = async (data) => {
    // dispatch(nullifyPermitValidation());
    await dispatch(GetPermitValidation(data?.address));
  };

  // Call Smarty AutoComplete Address Front-End API OnInputChange
  const handelOnInputChangeSmartyAutoCompleteAddress = (event, address) => {
    if(address.length === 0){
      dispatch(nullifyPermitValidation());
    }
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
      <Container component="main" maxWidth="sm">
        <Grid item xs={12} sm={0} md={2}></Grid>
        {
          getPermitValidation?.data ? <></> : 
          <>
            <Grid item xs={12} sm={12} md={12} >
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
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
                        }}
                        onInputChange={handelOnInputChangeSmartyAutoCompleteAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{textAlign: 'center', marginTop: '20px'}}>
                    <p>{getPermitValidation?.data?.success === false ? 'Not Available' : ''}</p>
                    <Button type="submit" variant="outlined" color={
                      getPermitValidation?.data?.success === true ? "success" : getPermitValidation?.data?.success === false ? 'secondary' :'primary'
                      } endIcon={<Search />}
                      >
                        {getPermitValidation?.data?.success === true ? 'Get permit' : 'Submit'}
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </>
        }
        
        {
          getPermitValidation?.data?.success === true ? <>
          <Grid item xs={12} sm={0} md={2}></Grid>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography component="h1" variant="h5"  style={{ marginBottom: '20px', textAlign: 'center' }}>
                Update Property Details
              </Typography>
              <form onSubmit={formikForm.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="climate_zone"
                      name="climate_zone"
                      label="Climate Zone"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.climate_zone}
                      error={formikForm.touched.climate_zone && Boolean(formikForm.errors.climate_zone)}
                      helperText={formikForm.touched.climate_zone && formikForm.errors.climate_zone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="full_street_address"
                      name="full_street_address"
                      label="Full Street Address"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.full_street_address}
                      disabled
                      error={formikForm.touched.full_street_address && Boolean(formikForm.errors.full_street_address)}
                      helperText={formikForm.touched.full_street_address && formikForm.errors.full_street_address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="unit"
                      name="unit"
                      label="Unit"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.unit}
                      error={formikForm.touched.unit && Boolean(formikForm.errors.unit)}
                      helperText={formikForm.touched.unit && formikForm.errors.unit}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="apn"
                      name="apn"
                      label="APN"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.apn}
                      disabled
                      error={formikForm.touched.apn && Boolean(formikForm.errors.apn)}
                      helperText={formikForm.touched.apn && formikForm.errors.apn}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="owner"
                      name="owner"
                      label="Owner"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.owner}
                      error={formikForm.touched.owner && Boolean(formikForm.errors.owner)}
                      helperText={formikForm.touched.owner && formikForm.errors.owner}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="year_built"
                      name="year_built"
                      label="Year Built"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.year_built}
                      disabled
                      error={formikForm.touched.year_built && Boolean(formikForm.errors.year_built)}
                      helperText={formikForm.touched.year_built && formikForm.errors.year_built}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="square_feet"
                      name="square_feet"
                      label="Square Feet"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.square_feet}
                      disabled
                      error={formikForm.touched.square_feet && Boolean(formikForm.errors.square_feet)}
                      helperText={formikForm.touched.square_feet && formikForm.errors.square_feet}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="lot_size"
                      name="lot_size"
                      label="Lot Size"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.lot_size}
                      disabled
                      error={formikForm.touched.lot_size && Boolean(formikForm.errors.lot_size)}
                      helperText={formikForm.touched.lot_size && formikForm.errors.lot_size}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="bedrooms"
                      name="bedroom"
                      label="Bedrooms"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.bedrooms}
                      disabled
                      error={formikForm.touched.bedrooms && Boolean(formikForm.errors.bedrooms)}
                      helperText={formikForm.touched.bedrooms && formikForm.errors.bedrooms}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="total_rooms"
                      name="total_rooms"
                      label="Total Rooms"
                      variant="outlined"
                      onChange={formikForm.handleChange}
                      onBlur={formikForm.handleBlur}
                      value={formikForm.values.total_rooms}
                      disabled
                      error={formikForm.touched.total_rooms && Boolean(formikForm.errors.total_rooms)}
                      helperText={formikForm.touched.total_rooms && formikForm.errors.total_rooms}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                  Continue
                </Button>
              </form>
            </Paper>
          </> : <></>
        }
        </Container>
      </Grid>
    </>
  )
};

export default EasySearch;

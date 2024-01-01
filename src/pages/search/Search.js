import React, {useEffect, useState} from 'react';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Formik
import { useFormik } from 'formik';
// material-ui
// import * as Yup from 'yup';
import { TextField, Button, Grid, Paper, Typography, Container, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';

import  SmartyAutocompleteAddress  from '../../components/SmartyAutocompleteAddress';
import Search from '@mui/icons-material/Search';


// project import
import { GetSmartyAutoCompleteAddress, GetPermitValidation } from '../../services/smartyAutoCompleteAddress.service';
import { SaveProperty } from '../../services/property.service';
import { nullifyAutoCompleteAddress, 
  nullifyPermitValidation 
} from "../../slices/smartyAutoCompleteAddressSlice.slice";

const EasySearch = () => {
  const { smartyAutoCompleteAddressList } = useSelector((state) => state.smartyAutoCompleteAddress)
  const { getPermitValidation } = useSelector((state) => state.getPermitValidation)
  const { saveProperty } = useSelector((state) => state.saveProperty)
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useDispatch();
  // console.log("response: ", getPermitValidation?.data?.message)
  console.log("saveProperty: ", saveProperty)
  
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
    project_extent:'',
    construction_worker: '',
  };
  
  // Property details update Formik Setup
  const formikForm = useFormik({
    initialValues: createInitialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log('property update data: ', values);
      handlePropertySubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (getPermitValidation?.data?.data) {
      formikForm.setValues({ ...createInitialValues, ...getPermitValidation?.data?.data });
    }
  }, [getPermitValidation?.data?.data, ]);

  // Handle Property Submit
  const handlePropertySubmit = async (data) => {
    await dispatch(SaveProperty(data));
  };

  // Addressh Auto Search Formik Setup
  const formik = useFormik({
    initialValues: {
      address: null,
    },
    onSubmit: (values) => {
      handleAutoSearchSubmit(values);
    },
    enableReinitialize: true,
  });

  // Handle AutoSearch Submit
  const handleAutoSearchSubmit = async (data) => {
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

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  useEffect(() => {
    if(saveProperty){
      setCurrentStep(0);
    }
  }, [saveProperty, ]);

  
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
          getPermitValidation?.data?.success === true ?
          <>
          
            <Grid item xs={12} sm={0} md={2}></Grid>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography component="h1" variant="h5"  style={{ marginBottom: '20px', textAlign: 'center' }}>
                Update Property Details
              </Typography>
              <form onSubmit={formikForm.handleSubmit}>
                <Grid container spacing={2}>
                  {currentStep === 0 && (
                    <>
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
                    </>
                  )}
                  {currentStep === 1 && (
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">What best describes the extent of your project?</FormLabel>
                        <RadioGroup
                          aria-label="project_extent"
                          name="project_extent"
                          onChange={formikForm.handleChange}
                          onBlur={formikForm.handleBlur}
                          value={formikForm.values.project_extent || ''}
                          row
                        >
                          <FormControlLabel value="new_structure" control={<Radio color="primary" />} label="New Structure" />
                          <FormControlLabel value="repair_replace_alter" control={<Radio color="primary" />} label="Repair, Replace, or Alter Existing Structure"/>
                        </RadioGroup>
                        {formikForm.touched.project_extent && formikForm.errors.project_extent && (
                          <Typography variant="body2" color="error">
                            {formikForm.errors.project_extent}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  )}
                  {currentStep === 2 && (
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Who will be doing the construction work?</FormLabel>
                        <RadioGroup
                          aria-label="construction_worker"
                          name="construction_worker"
                          onChange={formikForm.handleChange}
                          onBlur={formikForm.handleBlur}
                          value={formikForm.values.construction_worker || ''}
                          row
                        >
                          <FormControlLabel
                            value="owner_builder"
                            control={<Radio color="primary" />}
                            label="Myself as Owner-Builder"
                          />
                          <FormControlLabel
                            value="licensed_contractor"
                            control={<Radio color="primary" />}
                            label="Licensed Contractor"
                          />
                        </RadioGroup>
                        {formikForm.touched.construction_worker && formikForm.errors.construction_worker && (
                          <Typography variant="body2" color="error">
                            {formikForm.errors.construction_worker}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  )}

                  <Grid container spacing={2} justifyContent="space-between" style={{marginTop: '5px'}}>
                    <Grid item>
                        {currentStep > 0 && (
                        <Button variant="contained" color="primary" onClick={handleBack}>
                          Back
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                        {currentStep < 2 && (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                          Continue
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                
                {currentStep === 2 && (
                  <Button type="submit" fullWidth variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                    Submit
                  </Button>
                )}
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

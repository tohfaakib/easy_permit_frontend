import * as yup from "yup";

export const autoCompleteAddressSearchSchemaValidation = yup.object().shape({
    address: yup.string().required("Address is Required").max(250, "Address can't cross more than 250 characters"),
});
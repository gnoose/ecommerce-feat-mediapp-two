import React, { useContext } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { closeModal } from '@redq/reuse-modal';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
// import { useMutation } from '@apollo/client';
// import { UPDATE_ADDRESS } from 'graphql/mutation/address';
import { FieldWrapper, Heading } from './address-card.style';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { USERADDRESSES, COUNTRIES, PINCODE} from 'endpoints';
import NoResultFound from 'components/no-result/no-pincode';
import { openModal } from '@redq/reuse-modal';
import { useRouter } from 'next/router';

// Shape of form values
interface FormValues {
  id?: number | null;
  name?: string;
  info?: string;
  pincode?: string;
  phonenumber?: string;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.item.id || null,
      name: props.item.first_name + props.item.last_name || '',
      info: props.item.line1 || '',
      pincode: props.item.postcode || '',
      phonenumber: props.item.phone_number || '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Title is required!'),
    info: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    phonenumber: Yup.string().required('Phone number is required'),
  }),

  handleSubmit: (values) => {
    // do submitting things
  },
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleReset,
    isSubmitting,
  } = props;
  const addressValue = {
    id: values.id,
    type: 'secondary',
    name: values.name,
    info: values.info,
    pincode: values.pincode,
    phonenumber: values.phonenumber,
  };
  const cookies = new Cookies();
  const { state, dispatch } = useContext(ProfileContext);
  const [pincode, setPincode] = React.useState([]);
  const [pinvalid, setPinvalid] = React.useState("");
  const [phoneValid, setPhoneValid] = React.useState("")
  const [duplicateError, setDuplicateError] = React.useState("")

  // const [addressMutation, { data }] = useMutation(UPDATE_ADDRESS);
  const router = useRouter();
  const href = router.pathname;

  const handleSubmit = async () => {
    if (isValid) {
      const config = {
        headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
      };
      let pattern = new RegExp(/^[0-9\b]+$/);
      if (addressValue.phonenumber.length === 10 && pattern.test(addressValue.phonenumber)) {
        addressValue.phonenumber = '+91' + addressValue.phonenumber
        setPhoneValid("valid")
      } else if(addressValue.phonenumber.length === 13 && addressValue.phonenumber.substring(0,3) === '+91'){
        setPhoneValid("valid")
      }else {
        setPhoneValid("invalid")
        errors.phonenumber = "Please enter valid phone number.";
      }
      let payload = { 
        "country": `${COUNTRIES}IN/`,
        "line1":addressValue.info,
        "first_name":addressValue.name,
        "postcode":addressValue.pincode ,
        "phone_number":addressValue.phonenumber,
      }

      let isPinValid = false
      let pincodes = []
      if (addressValue.pincode && addressValue.pincode !== null && addressValue.pincode.length > 0) {
        axios.get(PINCODE, config)
          .then(response => {
            setPincode(response.data);
            pincodes = response.data;
            setPinvalid("invalid")
            for (var i = 0; i < pincodes.length; i++) {
              if (pincodes[i].pin_code == addressValue.pincode) {
                setPinvalid("valid")
                isPinValid = true
              }
            }
              if (item.id) {
                //update 
                const PutPayload = { ...payload, ...{ "id": item.id } };
                axios.put(`${USERADDRESSES}${item.id}/`, PutPayload, config)
                  .then(response => {
                    dispatch({ type: 'ADD_OR_UPDATE_ADDRESS', payload: response.data });
                    closeModal();
                  })
                  .catch(err => {
                    //TODO display a error message 
                    if (err.response) {
                      if(err.status === 406){
                        setDuplicateError('same address already exists')
                      }
                      // client received an error response (5xx, 4xx)
                    } else if (err.request) {
                      // client never received a response, or request never left
                    } else {
                      // anything else
                    }
                  });
              } else {
                //Add new item
                axios.post(USERADDRESSES, payload, config)
                  .then(response => {
                    dispatch({ type: 'ADD_OR_UPDATE_ADDRESS', payload: response.data });
                    closeModal();
                  })
                  .catch(err => {
                    console.log("address-card : Error occuured while handle submit ")
                    //TODO display a error message 
                    console.error("Error occured while saving address");
                    if (err.response) {
                      if(err.response.status === 406){
                        setDuplicateError('same address already exists')
                      }
                      // client received an error response (5xx, 4xx)
                    } else if (err.request) {
                      // client never received a response, or request never left
                    } else {
                      // anything else

                    }
                  });
              }
            // else {
            //   router.push(href, href, { shallow: true });
            //   // return <NoResultFound />;
            //   openModal({
            //     show: true,
            //     overlayClassName: 'quick-view-overlay',
            //     closeOnClickOutside: true,
            //     component: NoResultFound,
            //     closeComponent: '',
            //     config: {
            //       enableResizing: false,
            //       disableDragging: true,
            //       className: 'quick-view-modal',
            //       width: 458,
            //       height: 'auto',
            //     },
            //   });
      
            //   return <></>;
            // }
          })
      }
    }
  };
  return (
    <Form>
      <Heading>{item && item.id ? 'Edit Address' : 'Add New Address'}</Heading>
      <FieldWrapper>
        <div>Name</div>
        <TextField
          id="name"
          type="text"
          placeholder="Enter Name"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      {/* {pinvalid === "invalid" ? <div><p style={{color: "red"}}> Shipping is not available for this pincode</p></div>: null} */}
      <FieldWrapper>
      <div>Pincode</div>
        <TextField
          id="pincode"
          type="text"
          placeholder="Enter Pincode"
          error={touched.pincode && errors.pincode}
          value={values.pincode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      {(phoneValid === "invalid") ?
        <div style={{color: "red"}}>
          <FormattedMessage
            id='errorLoginText'
            defaultMessage='Please enter a valid mobile number.'
          />
        </div> : null
      }
      <FieldWrapper>
      <div>Mobile Number</div>
        <TextField
          id="phonenumber"
          type="text"
          placeholder="Ex: +919999099990"
          error={touched.phonenumber && errors.phonenumber}
          value={values.phonenumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
      <div>Address</div>
        <TextField
          id="info"
          as="textarea"
          placeholder="Enter Address"
          error={touched.info && errors.info}
          value={values.info}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: '100%', height: '44px' }}
      >
        <FormattedMessage id="savedAddressId" defaultMessage="Save Address" />
      </Button>
      {(duplicateError!=="") ?
        <div style={{color: "red"}}>
          <FormattedMessage
            id='errorDuplicateAddress'
            defaultMessage='This address is already added please select the added address'
          />
        </div> : null
      }
    </Form>
  );
};

export default FormEnhancer(UpdateAddress);

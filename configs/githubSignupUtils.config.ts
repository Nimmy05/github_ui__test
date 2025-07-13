
import { generateSignUpFormValues } from 'utils/forms/formDataGenerators';

const signUpData = generateSignUpFormValues();

const thisTestConfig = {
  "sign_up_data": signUpData,
  "sign_up_form_fields": {
    "email": {
      "field_id": "email",
      "field_type": "input",
      "value_to_fill": signUpData.email,
      "country_code": ""
    },
    "password": {
      "field_id": "password",
      "field_type": "input",
      "value_to_fill": signUpData.password,
      "country_code": ""
    },
    "login": {
      "field_id": "login",
      "field_type": "input",
      "value_to_fill": signUpData.username,
      "country_code": ""
    },
    "country_or_region": {
      "field_id": "select-panel",
      "field_type": "dropDown",
      "value_to_fill": "Denmark",
      "country_code": "DK"
    },


  },
};

export default thisTestConfig;
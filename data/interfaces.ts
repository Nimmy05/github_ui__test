export type InputFieldKey = 'email' | 'password' | 'login';

export interface FallbackValues {
  email: string;
  password: string;
  username: string;
}

export interface FormField {
  field_id: string;
  field_type: 'input' | 'dropDown';
  value_to_fill: string;
  country_code: string;
}

export type SignUPForm = {
  email: FormField;
  password: FormField;
  login: FormField;
  country_or_region: FormField;
};



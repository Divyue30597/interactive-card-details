import { Field, Formik, Form, FormikProps } from "formik";
import "./form.css";
import * as Yup from "yup";
import { TformValues } from "../../App";

const validCardSchema = Yup.object().shape({
  holderName: Yup.string()
    .min(2, "Too Short!")
    .max(52, "Too Long!")
    .required("Name cannot be empty"),
  cardNumber: Yup.number()
    .required("Wrong Format, Numbers Only")
    .positive()
    .max(9999_9999_9999_9999, "Cannot be more than 16"),
  expMonth: Yup.number()
    .max(12, "Cannot be more than 12")
    .required("Can't be blank"),
  expYear: Yup.number()
    .max(9999, "Cannot be more than 12")
    .required("Can't be blank"),
  cardCvc: Yup.number()
    .max(999, "Cannot be more than 12")
    .required("Can't be blank"),
});

function cc_format(value: number) {
  if (value !== null && value !== undefined) {
    const v = value
      .toString()
      ?.replace(/\s+/g, "")
      ?.replace(/[^0-9]/gi, "")
      ?.substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }
}

function FormInputV2({
  id,
  labelName,
  placeholder,
  fieldProperty,
}: {
  id: string;
  labelName: string;
  placeholder: string;
  fieldProperty: FormikProps<any>;
}) {
  return (
    <Field name={id}>
      {({ meta }: { meta: any }) => (
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor={id}>{labelName}</label>
          {id === "cardNumber" ? (
            <input
              id={id}
              name={id}
              type="text"
              placeholder={placeholder}
              onChange={fieldProperty.handleChange}
              onBlur={fieldProperty.handleBlur}
              value={cc_format(fieldProperty.values.cardNumber)}
              style={
                meta.touched && meta.error ? { border: "2px solid red" } : {}
              }
            />
          ) : (
            <input
              id={id}
              name={id}
              type="text"
              placeholder={placeholder}
              onChange={fieldProperty.handleChange}
              onBlur={fieldProperty.handleBlur}
              style={
                meta.touched && meta.error ? { border: "2px solid red" } : {}
              }
            />
          )}
          {meta.touched && meta.error && (
            <p style={{ color: "red", fontSize: "12px" }} className="error">
              {meta.error}
            </p>
          )}
        </div>
      )}
    </Field>
  );
}

// function FormInput({ label, fieldName, placeholder }) {
//   return (
//     <div className="form-input">
//       <label htmlFor={fieldName}>{label}</label>
//       <Field
//         id={fieldName}
//         name={fieldName}
//         placeholder={placeholder}
//         style={meta.touched && meta.error ? { border: "2px solid red" } : {}}
//       />
//       <p style={{ color: "red", fontSize: "12px" }}>
//         <ErrorMessage name={fieldName} />
//       </p>
//     </div>
//   );
// }

export function FormComp({
  setFormSubmit,
  setFormValues,
}: {
  setFormSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setFormValues: React.Dispatch<React.SetStateAction<TformValues>>;
}) {
  return (
    <Formik
      initialValues={{
        holderName: "",
        cardNumber: "",
        expMonth: undefined,
        expYear: undefined,
        cardCvc: undefined,
      }}
      validationSchema={validCardSchema}
      onSubmit={(values) => {
        setFormSubmit(true);
        setFormValues({ ...values });
      }}
    >
      {(props) => (
        <Form>
          <div className="holder-data">
            <FormInputV2
              id={"holderName"}
              labelName={"Card Holder"}
              placeholder={"e.g. Jane Appleseed"}
              fieldProperty={props}
            />
            <FormInputV2
              id={"cardNumber"}
              labelName={"Card Number"}
              placeholder={"e.g. 0000 0000 0000 0000"}
              fieldProperty={props}
            />
          </div>
          <div className="expiry-date-and-cvc">
            <div className="expiry-date">
              <FormInputV2
                id={"expMonth"}
                labelName={"Exp. date"}
                placeholder={"MM"}
                fieldProperty={props}
              />
              <FormInputV2
                id={"expYear"}
                labelName={"(MM/YY)"}
                placeholder={"YY"}
                fieldProperty={props}
              />
            </div>
            <div className="cvc">
              <FormInputV2
                id={"cardCvc"}
                labelName={"CVC"}
                placeholder={"CVC"}
                fieldProperty={props}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

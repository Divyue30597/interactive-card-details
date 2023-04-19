import { Field, Formik, Form, ErrorMessage } from "formik";
import "./form.css";
import * as Yup from "yup";

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

function cc_format(value) {
  const v = value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .substr(0, 16);
  const parts = [];

  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substr(i, 4));
  }

  return parts.length > 1 ? parts.join(" ") : value;
}

function FormInput({ label, fieldName, placeholder }) {
  return (
    <div className="form-input">
      <label htmlFor={fieldName}>{label}</label>
      <Field id={fieldName} name={fieldName} placeholder={placeholder} />
      <p style={{ color: "red", fontSize: "12px" }}>
        <ErrorMessage name={fieldName} />
      </p>
    </div>
  );
}

export function FormComp({ setFormSubmit, setFormValues }) {
  return (
    <Formik
      initialValues={{
        holderName: "",
        cardNumber: undefined,
        expMonth: undefined,
        expYear: undefined,
        cardCvc: undefined,
      }}
      validationSchema={validCardSchema}
      onSubmit={(values) => {
        setFormSubmit(true);
        setFormValues({ ...values });
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="holder-data">
            <FormInput
              label={"Card holder data"}
              fieldName={"holderName"}
              placeholder={"e.g. Jane Appleseed"}
            />
            <Field name="cardNumber">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  {`${console.log(field)}`}
                  <input type="text" placeholder="Email" {...field} />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div className="expiry-date-and-cvc">
            <div className="expiry-date">
              <FormInput
                fieldName={"expMonth"}
                label={"Exp. date"}
                placeholder={"MM"}
              />
              <FormInput
                fieldName={"expYear"}
                label={"(MM/YY)"}
                placeholder={"YY"}
              />
            </div>
            <div className="cvc">
              <FormInput
                fieldName={"cardCvc"}
                label={"CVC"}
                placeholder={"CVC"}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>

    // <form>
    //   <div className="holder-data">
    //     <FormInput
    //       id={"card-holder-name"}
    //       label={"Card Holder Name"}
    //       placeholder={"e.g. Jane Appleseed"}
    //     />
    //     <FormInput
    //       id={"card-number"}
    //       label={"Card Number"}
    //       placeholder={"e.g. 1234 5678 9101"}
    //     />
    //   </div>

    //   <div className="expiry-date-and-cvc">
    //     <div className="expiry-date">
    //       <FormInput id={"mm"} label={"Exp. date"} placeholder={"MM"} />
    //       <FormInput id={"yy"} label={"(MM/YY)"} placeholder={"YY"} />
    //     </div>
    //     <div className="cvc">
    //       <FormInput id={"cvc"} label={"CVC"} placeholder={"CVC"} />
    //     </div>
    //   </div>
    // </form>
  );
}

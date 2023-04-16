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

export function FormComp() {
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
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="holder-data">
            <FormInput
              label={"Card holder data"}
              fieldName={"holderName"}
              placeholder={"e.g. Jane Appleseed"}
            />
            <FormInput
              label={"Card Number"}
              fieldName={"cardNumber"}
              placeholder={"e.g. 1234 5678 9101"}
            />
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

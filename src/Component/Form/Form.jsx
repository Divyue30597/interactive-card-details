import "./form.css";

function FormInput({ label, id, placeholder }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" placeholder={placeholder} />
    </div>
  );
}

export function Form() {
  return (
    <form>
      <div className="holder-data">
        <FormInput
          id={"card-holder-name"}
          label={"Card Holder Name"}
          placeholder={"e.g. Jane Appleseed"}
        />
        <FormInput
          id={"card-number"}
          label={"Card Number"}
          placeholder={"e.g. 1234 5678 9101"}
        />
      </div>

      <div className="expiry-data-and-cvc">
        <div className="expiry-data">
          <FormInput id={"mm"} label={"Exp. date"} placeholder={"MM"} />
          <FormInput id={"YY"} label={"(MM/YY)"} placeholder={"YY"} />
        </div>
        <div className="cvc">
          <FormInput id={"cvc"} label={"CVC"} placeholder={"CVC"} />
        </div>
      </div>
    </form>
  );
}

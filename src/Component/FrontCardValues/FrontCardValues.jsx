import "./frontcardvalues.css";

export function FrontCardValues({ formValues }) {
  return (
    <div className="front-card-values">
      <p className="form-cardNumber">{formValues.cardNumber}</p>
      <div className="holderName-mm-yy">
        <p className="form-holdername">{formValues.holderName}</p>
        <p className="form-expMonth-expYear">
          {formValues.expMonth}/{formValues.expYear}
        </p>
      </div>
    </div>
  );
}

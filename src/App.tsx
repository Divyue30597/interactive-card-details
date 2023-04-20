import "./App.css";

import cardFrontImage from "./assets/bg-card-front.png";
import cardBackImage from "./assets/bg-card-back.png";
import cardLogoImage from "./assets/card-logo.svg";
import { useState } from "react";

import { FormSubmitSuccess } from "./Component/FormSubmitSuccess/FormSubmitSuccess";
import { ImageComp } from "./Component/ImageComp/ImageComp";
import { FormComp } from "./Component/Form/FormComp";
import { FrontCardValues } from "./Component/FrontCardValues/FrontCardValues";

function App() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    holderName: "JANE APPLESEED",
    cardNumber: "0000 0000 0000 0000",
    expMonth: "00",
    expYear: "00",
    cardCvc: "000",
  });

  return (
    <div className="App">
      <section className="credit-card-payment">
        <div className="background-image-figure"></div>
        <div className="card-image-front">
          <ImageComp imageName={cardFrontImage} altText={"front of the card"} />
          <ImageComp imageName={cardLogoImage} altText={"Card logo"} />
          <FrontCardValues formValues={formValues} />
        </div>
        <div className="card-image-back">
          <ImageComp imageName={cardBackImage} altText={"back of the card"} />
          <p className="exp-CVC">{formValues.cardCvc}</p>
        </div>
        <div className="full-form">
          {formSubmit ? (
            <FormSubmitSuccess />
          ) : (
            <FormComp
              setFormSubmit={setFormSubmit}
              setFormValues={setFormValues}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

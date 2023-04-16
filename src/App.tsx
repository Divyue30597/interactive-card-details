import "./App.css";

import cardFrontImage from "./assets/bg-card-front.png";
import cardBackImage from "./assets/bg-card-back.png";
import cardLogoImage from "./assets/card-logo.svg";
import { ImageComp } from "./Component/ImageComp/ImageComp";
import { Form } from "./Component/Form/Form";

function App() {
  return (
    <div className="App">
      <section className="credit-card-payment">
        <div className="background-image-figure"></div>
        <div className="card-image-front">
          <ImageComp imageName={cardFrontImage} altText={"front of the card"} />
          <ImageComp imageName={cardLogoImage} altText={"Card logo"} />
        </div>
        <div className="card-image-back">
          <ImageComp imageName={cardBackImage} altText={"back of the card"} />
        </div>
        <div className="full-form">
          <Form />
        </div>
      </section>
    </div>
  );
}

export default App;

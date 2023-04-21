import { ImageComp } from "../ImageComp/ImageComp";
import "./formsubmitsuccess.css";
import completedSavingCardDetailsImage from "../../assets/icon-complete.svg";

export function FormSubmitSuccess() {
  return (
    <div className="form-submit-success">
      <ImageComp
        altText={"Completed saving card details"}
        imageName={completedSavingCardDetailsImage}
      />
      <h2>Thank You!</h2>
      <p>We've added your card details</p>
      <button>Continue</button>
    </div>
  );
}

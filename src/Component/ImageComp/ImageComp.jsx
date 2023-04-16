export function ImageComp({ imageName, altText }) {
  return (
    <figure>
      <img src={imageName} alt={altText} />
    </figure>
  );
}

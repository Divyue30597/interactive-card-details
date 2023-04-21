interface ImageCompProp {
  imageName: string;
  altText: string;
}

export function ImageComp({ imageName, altText }: ImageCompProp) {
  return (
    <figure>
      <img src={imageName} alt={altText} />
    </figure>
  );
}

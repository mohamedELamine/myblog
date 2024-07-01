const ImageWrapper = (props: JSX.IntrinsicElements["img"]) => {
  return (
    <div className="flex flex-col my-5">
      <img alt={props.alt} className="mx-auto my-0" src={props.src} />
      <div className="mx-auto my-1 text-sm text-gray-500 dark:text-gray-300">{props.alt}</div>
    </div>
  );
};

export default ImageWrapper;

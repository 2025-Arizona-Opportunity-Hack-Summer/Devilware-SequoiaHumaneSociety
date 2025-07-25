import ImageItem from "./ImagesItem";

function ImageList({ images, onClickDeleteImage }) {
  const imagesListRender = images.map((image) => {
    return (
      <li key={image.url}>
        <ImageItem url={image.url} fileName={image.fileName} onClickDeleteImage={onClickDeleteImage} />
      </li>
    );
  });

  return (
    <div>
      <ul>{imagesListRender}</ul>
    </div>
  );
}

export default ImageList;

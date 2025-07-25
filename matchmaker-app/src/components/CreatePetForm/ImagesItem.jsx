function ImageItem({ url, fileName, onClickDeleteImage }) {
  return (
    <div className="flex flex-row-reverse w-max bg-[#d3d3d3] p-3 gap-2 rounded-md">
      <label
        htmlFor={`delete-${fileName}`}
        className="block bg-red-500 h-max px-2 rounded-md text-white cursor-pointer font-semibold">
        x
      </label>
      <input
        type="button"
        id={`delete-${fileName}`}
        name={`delete-${fileName}`}
        onClick={onClickDeleteImage.bind(null, url, fileName)}
        className="hidden"
      />
      <img src={url} alt={fileName} className="w-72" />
    </div>
  );
}

export default ImageItem;

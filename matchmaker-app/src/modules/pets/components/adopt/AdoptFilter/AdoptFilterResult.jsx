function AdoptFilterResult({ breedFilter, activeLevelFilter, sizeFilter, onClickClearAll }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <AdopterFilterList filterList={breedFilter} />
      <AdopterFilterList filterList={activeLevelFilter} />
      <AdopterFilterList filterList={sizeFilter} />
      {(breedFilter.length !== 0 || activeLevelFilter.length !== 0 || sizeFilter.length !== 0) && (
        <button onClick={onClickClearAll} className="font-semibold text-[#7C0F0F] text-lg cursor-pointer">
          Clear all
        </button>
      )}
    </div>
  );
}

function AdopterFilterList({ filterList = [], title }) {
  const filterItem = filterList.map((item) => (
    <li key={item} className="bg-[#7C0F0F] text-white px-3 py-2 rounded-md">
      {item}
    </li>
  ));

  if (filterList.length === 0) {
    return <></>;
  }

  return (
    <div className="flex lg:items-center items-start">
      <ul className="flex gap-2 flex-wrap">{filterItem}</ul>
    </div>
  );
}

export default AdoptFilterResult;

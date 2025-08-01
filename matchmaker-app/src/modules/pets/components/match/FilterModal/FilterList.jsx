function FilterList({ filterValue, onClickRemoveItem }) {
  const { speciesFilter, breedFilter, activeLevelFilter, sizeFilter, sortFilter } = filterValue;
  return (
    <div className="flex gap-3">
      <FilterItem filterList={speciesFilter} title={"Species"} onClickRemoveItem={onClickRemoveItem} />
      <FilterItem filterList={breedFilter} title={"Breed"} onClickRemoveItem={onClickRemoveItem} />
      <FilterItem filterList={activeLevelFilter} title={"Active level"} onClickRemoveItem={onClickRemoveItem} />
      <FilterItem filterList={sizeFilter} title={"Size"} onClickRemoveItem={onClickRemoveItem} />
      {sortFilter !== "" && (
        <FilterItem filterList={[sortFilter]} title={"Sort"} onClickRemoveItem={onClickRemoveItem} />
      )}
    </div>
  );
}

function FilterItem({ filterList, title, onClickRemoveItem }) {
  if (filterList === null || filterList.length === 0) {
    return <></>;
  }

  const filterItemRender = filterList.map((item) => (
    <li key={item} className="font-semibold text-white">
      <div className="bg-[#7C0F0F] px-3 p-2 rounded-md flex justify-between gap-3 items-center">
        <p>{item}</p>
        {/* <button className="font-light cursor-pointer" onClick={onClickRemoveItem.bind(null, title, item)}>
          x
        </button> */}
      </div>
    </li>
  ));

  return (
    <div className="flex gap-2 items-center">
      <ul className="flex gap-2">{filterItemRender}</ul>
    </div>
  );
}

export default FilterList;

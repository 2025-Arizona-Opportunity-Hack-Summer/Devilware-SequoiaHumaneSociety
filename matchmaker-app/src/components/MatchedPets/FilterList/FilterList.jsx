function FilterList({ filterValue }) {
  const { speciesFilter, breedFilter, activeLevelFilter, sizeFilter, sortFilter } = filterValue;
  return (
    <div className="flex flex-col gap-3">
      <FilterItem filterList={speciesFilter} title={"Species"} />
      <FilterItem filterList={breedFilter} title={"Breed"} />
      <FilterItem filterList={activeLevelFilter} title={"Active level"} />
      <FilterItem filterList={sizeFilter} title={"Size"} />
      {sortFilter !== "" && <FilterItem filterList={[sortFilter]} title={"Sort"} />}
    </div>
  );
}

function FilterItem({ filterList, title }) {
  if (filterList === null || filterList.length === 0) {
    return <></>;
  }

  const filterItemRender = filterList.map((item) => (
    <li key={item} className="font-semibold text-white">
      <div className="bg-[#7C0F0F] px-3 p-2 rounded-md flex justify-between gap-2">
        <p>{item}</p>
      </div>
    </li>
  ));

  return (
    <div className="flex gap-2 items-center">
      <p className="font-semibold">{title}</p>
      <ul className="flex gap-2">{filterItemRender}</ul>
    </div>
  );
}

export default FilterList;

function AdoptFilterList({ breedFilter, activeLevelFilter }) {
  return (
    <div className="flex gap-2">
      <AdopterFilterItem filterList={breedFilter} />
      <AdopterFilterItem filterList={activeLevelFilter} />
    </div>
  );
}

function AdopterFilterItem({ filterList = [], title }) {
  const filterItem = filterList.map((item) => (
    <li key={item} className="bg-[#7C0F0F] text-white px-3 py-2 rounded-md">
      {item}
    </li>
  ));

  if (filterList.length === 0) {
    return <></>;
  }

  return (
    <div className="flex gap-2 items-center">
      <ul className="flex gap-2">{filterItem}</ul>
    </div>
  );
}

export default AdoptFilterList;

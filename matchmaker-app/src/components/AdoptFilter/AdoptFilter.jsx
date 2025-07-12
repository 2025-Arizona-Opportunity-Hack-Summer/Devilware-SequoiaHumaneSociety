import InputCheckboxSelection from "./InputCheckboxSelection/InputCheckboxSelection";

function AdoptFilter({ breedList = [], setFilter, filterValue }) {
  const { setBreedFilter } = setFilter;
  const { breedFilter } = filterValue;

  return (
    <div>
      <InputCheckboxSelection
        title="breeds"
        dataList={breedList}
        id="breed"
        values={breedFilter}
        setValues={setBreedFilter}
      />
    </div>
  );
}

export default AdoptFilter;

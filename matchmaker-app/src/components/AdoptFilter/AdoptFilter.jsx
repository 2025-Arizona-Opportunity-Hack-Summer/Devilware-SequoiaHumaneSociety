import { useState } from "react";

import InputCheckboxSelection from "./InputCheckboxSelection/InputCheckboxSelection";

function AdoptFilter({ breedList = [], setFilter, filterValue }) {
  const { breedFilter, activeLevelFiter, sizeFilter } = filterValue;
  const { setBreedFilter, setActiveLevelFilter, setSizeFilter } = setFilter;
  const [visibleBreedSelection, setVisibleBreedSelection] = useState(false);
  const [visibleActiveLevelSelection, setActiveLevelSelection] = useState(false);
  const [visibleSizeSelection, setVisibleSizeSelection] = useState(false);

  const visibleSelection = [setVisibleBreedSelection, setActiveLevelSelection, setVisibleSizeSelection];

  const openSelection = (type, value) => {
    visibleSelection.forEach((selection) => {
      if (type === selection) {
        if (value === true) {
          selection((preState) => false);
        } else {
          selection((preState) => true);
        }
      } else {
        selection((preState) => false);
      }
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <InputCheckboxSelection
        title="breeds"
        dataList={breedList}
        values={breedFilter}
        setValues={setBreedFilter}
        visibleList={visibleBreedSelection}
        onClickButton={openSelection.bind(null, setVisibleBreedSelection, visibleBreedSelection)}
      />
      <InputCheckboxSelection
        title="active levels"
        dataList={["Very Active", "Moderately Active", "Slightly actives"]}
        values={activeLevelFiter}
        setValues={setActiveLevelFilter}
        visibleList={visibleActiveLevelSelection}
        onClickButton={openSelection.bind(null, setActiveLevelSelection, visibleActiveLevelSelection)}
      />
      <InputCheckboxSelection
        title="sizes"
        dataList={["Large", "Medium", "Small"]}
        values={sizeFilter}
        setValues={setSizeFilter}
        visibleList={visibleSizeSelection}
        onClickButton={openSelection.bind(null, setVisibleSizeSelection, visibleSizeSelection)}
      />
    </div>
  );
}

export default AdoptFilter;

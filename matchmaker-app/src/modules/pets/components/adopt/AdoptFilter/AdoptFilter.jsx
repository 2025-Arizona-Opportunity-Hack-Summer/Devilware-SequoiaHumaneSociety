import { useState } from "react";

import InputCheckboxSelection from "./InputCheckboxSelection";

function AdoptFilter({ breedList = [], setFilter, filterValue }) {
  const { breedFilter, activeLevelFiter, sizeFilter } = filterValue; // destructing filter values
  const { setBreedFilter, setActiveLevelFilter, setSizeFilter } = setFilter; // destructing set filter values
  const [visibleBreedSelection, setVisibleBreedSelection] = useState(false); // represents visibility of breed filter selection
  const [visibleActiveLevelSelection, setActiveLevelSelection] = useState(false); // represents visibility of active level filter selection
  const [visibleSizeSelection, setVisibleSizeSelection] = useState(false); // represents visibility of size filter selection

  const visibleSelection = [setVisibleBreedSelection, setActiveLevelSelection, setVisibleSizeSelection]; // contains all the visibility of filter selection

  /*
    openSelection:
    - handler when one of the selection is visible
    - all visibility of other filer will be set to false -> close
    - if the visibility of current filter is true, will be set to false -> also close
    - otherwise set the visiblity of the current filter to true -> open
  */
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

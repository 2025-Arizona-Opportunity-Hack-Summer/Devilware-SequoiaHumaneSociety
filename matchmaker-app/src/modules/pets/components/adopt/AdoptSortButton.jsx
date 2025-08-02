function AdoptSortButton({ onClickSortToggle, sortFilter, visibleSortList, onClickSortOption }) {
  return (
    <div className="flex gap-3 items-center w-max">
      <p className="font-semibold">Sort by</p>
      <div className="relative">
        <button
          className="min-w-[139px] text-center px-2 py-2 cursor-pointer shadow-xl bg-[#ff] text-[#4f2edc] font-semibold border-[#4f2edc] border"
          onClick={onClickSortToggle}>
          {sortFilter === "" ? "Most relevant" : sortFilter}
        </button>
        <AdoptSortOptionList visible={visibleSortList} onClickSortOption={onClickSortOption} />
      </div>
    </div>
  );
}

export default AdoptSortButton;

function AdoptSortOptionList({ visible, onClickSortOption }) {
  if (visible === false) {
    return <></>;
  }

  return (
    <ul className="flex flex-col xl:max-h-52 overflow-y-auto overflow-x-hidden absolute z-20 shadow-2xl list-option w-max">
      <li className="flex flex-row justify-between cursor-pointer w-max">
        <button
          className="w-[139px] text-left border border-[#adb5bd] first:border-t p-2 bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
          onClick={onClickSortOption.bind(null, "")}>
          Most relevant
        </button>
      </li>
      <li className="flex flex-row justify-between cursor-pointer w-max">
        <button
          className="border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
          onClick={onClickSortOption.bind(null, "Alphabetical A-Z")}>
          Alphabetical A-Z
        </button>
      </li>
      <li className="flex flex-row justify-between cursor-pointer">
        <button
          className="border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
          onClick={onClickSortOption.bind(null, "Alphabetical Z-A")}>
          Alphabetical Z-A
        </button>
      </li>
    </ul>
  );
}

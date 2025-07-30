import InputCheckbox from "../../../../../../components/common/inputs/InputCheckbox";

function SortFilter({ sortFilter, setSortFilter }) {
  const sorts = ["Alphabetical A-Z", "Alphabetical Z-A"];

  const onChangeSortFilter = (event) => {
    if (event.target.value === sortFilter) {
      setSortFilter((preState) => "");
    } else {
      setSortFilter((preState) => event.target.value);
    }
  };

  const SortsCheckboxes = sorts.map((item) => (
    <InputCheckbox
      id={`filter_${item}`}
      value={item}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={sortFilter === item}
      key={`filter_${item}`}
      onChangeHandler={onChangeSortFilter}>
      {item}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Sorts</p>
      <div className="flex justify-start gap-3 flex-wrap">{SortsCheckboxes}</div>
    </div>
  );
}

export default SortFilter;

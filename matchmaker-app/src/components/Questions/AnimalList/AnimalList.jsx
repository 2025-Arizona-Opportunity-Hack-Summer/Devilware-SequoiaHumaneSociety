/**
  Use for household composition question hc3
  @param {Object} properties attributes of component
  @param {[string]} propertes.animalList list of animal provided by parent's component state
  @param {function(any):void} properties.setAnimalList function change the state of parent's component
**/

function AnimalList({ animalList, setAnimalList }) {
  const onClickAddNewAnimal = () => {
    const newAnimal = {
      type: "",
      age: "",
      isNeutered: "",
    };
    setAnimalList((prevState) => [...prevState, newAnimal]);
  };

  const onChangeAnimalList = (index, type, value) => {
    setAnimalList((prevState) =>
      prevState.map((animal, idx) => {
        if (idx === index) {
          animal[type] = value;
        }
        return animal;
      })
    );
  };

  /**
   * fired when one of [type, age, isNeutered] is selected
   * **/
  const onChangeSelect = (event) => {
    const [idx, type] = String(event.target.id).split(" ");
    onChangeAnimalList(Number(idx), type, event.target.value);
  };

  const onClickRemove = (idx) => {
    setAnimalList((prevState) =>
      prevState.filter((animal, index) => {
        if (index == idx) {
          return false;
        }
        return true;
      })
    );
  };

  /**
   * default option for type
   * **/
  const typeOptions = ["Dog", "Cat", "Bird"].map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  /**
   * default option for age
   * **/
  const ageOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "24", "36", "48", "60", ">60"].map(
    (value) => (
      <option key={value} value={value}>
        {value}
      </option>
    )
  );

  /**
   * default option for isNeutered
   * **/
  const neuteredOptions = [true, false].map((value) => (
    <option key={value} value={value}>
      {value === true ? "Neutered" : "Spayed"}
    </option>
  ));

  return (
    <div className="flex flex-col gap-2 items-end">
      {/* Add new animal button */}
      <div>
        <input
          id="addAnimalButton"
          name="addButton"
          type="button"
          className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
          onClick={onClickAddNewAnimal}
          value="Add new animal"
        />
      </div>

      {/* Animal description */}
      <div className="flex flex-col gap-2">
        {animalList !== "" &&
          animalList.map((animal, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-wrap">
              <label htmlFor={`${idx} type`} className="font-semibold">
                Type
              </label>
              <select
                value={animalList[idx].type}
                id={`${idx} type`}
                name={`${idx} type`}
                onChange={onChangeSelect}
                className="block px-3 py-3 border border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer">
                <option value={""} disabled></option>
                {typeOptions}
              </select>

              <label htmlFor={`${idx} age`} className="font-semibold">
                Age (months)
              </label>
              <select
                value={animalList[idx].age}
                id={`${idx} age`}
                name={`${idx} age`}
                onChange={onChangeSelect}
                className="block px-3 py-3 border border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer">
                <option value={""} disabled></option>
                {ageOptions}
              </select>

              <label htmlFor={`${idx} isNeutered`} className="font-semibold">
                Neutered
              </label>
              <select
                value={animalList[idx].isNeutered}
                id={`${idx} isNeutered`}
                name={`${idx} isNeutered`}
                onChange={onChangeSelect}
                className="block px-3 py-3 border border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer">
                <option value={""} disabled></option>
                {neuteredOptions}
              </select>

              <input
                type="button"
                value={"R"}
                className="bg-[#C1272D] text-white px-2 font-semibold rounded-sm cursor-pointer"
                onClick={onClickRemove.bind(null, idx)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AnimalList;

import { useSelector } from "react-redux";

import { speciesFilterSlice } from "../../../redux/MatchedFilterSlice";

function FilterList() {
  const speciesFilter = useSelector((store) => store[speciesFilterSlice.name]);

  return <div></div>;
}

function FilterItem({ filterList }) {
  return <li>{}</li>;
}

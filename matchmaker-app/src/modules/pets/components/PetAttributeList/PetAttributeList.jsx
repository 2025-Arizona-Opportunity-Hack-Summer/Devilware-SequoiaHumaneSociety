import "./PetAttributeList.css";

function PetAttributeList({ attributes = [] }) {
  const attributeItem = attributes.map((item) => (
    <li key={item} className="attribute-item w-max">
      {item}
    </li>
  ));
  return (
    <div>
      <ul className="flex gap-2">{attributeItem}</ul>
    </div>
  );
}

export default PetAttributeList;

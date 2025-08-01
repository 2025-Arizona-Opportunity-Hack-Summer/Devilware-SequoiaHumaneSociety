import InputButton from "../../../../../../components/common/inputs/InputButton";
import edit from "../../../../../../assets/images/pencil-svgrepo-com.svg";

function AnswerContainer({ children, className, visible, id, onClickEdit }) {
  if (visible === false) {
    return <></>;
  }
  return (
    <div className="w-full flex items-center answer-box justify-end">
      <InputButton
        id={`edit_${id}`}
        onClickHandler={onClickEdit}
        inputStyle="hidden"
        labelStyle="mr-2 cursor-pointer hover:bg-[#fae0e4] p-2 rounded-full">
        <img src={edit} alt={id} className="w-5 h-5" />
      </InputButton>

      <div className={`bg-[#7C0F0F] p-3 rounded-md text-white ${className}`}>{children}</div>
    </div>
  );
}

export default AnswerContainer;

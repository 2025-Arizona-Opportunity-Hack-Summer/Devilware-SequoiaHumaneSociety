import SessionStorage from "../../features/sessionStorage";

function ReviewQuestions() {
  const [he1, he2, he3, he4, he5] = ["he1", "he2", "he3", "he4", "he5"].map((id) =>
    JSON.parse(sessionStorage.getItem(id))
  );

  console.log(he1);

  return (
    <div className="flex justify-start w-full">
      <h2 className="text-2xl font-semibold text-[#7C0F0F]">Review</h2>
    </div>
  );
}

export default ReviewQuestions;

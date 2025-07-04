import { useEffect } from "react";
import SessionStorage from "../../../features/sessionStorage";

function ReviewQuestions({ setOpenSubmit }) {
  useEffect(() => {
    setOpenSubmit((preState) => true);
    const scrollUp = () => {
      window.scroll(0, 0);
    };
    window.addEventListener("load", scrollUp);

    return () => {
      window.removeEventListener("load", scrollUp);
    };
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#7C0F0F]">Review</h2>
      <ol className="flex flex-col gap-5 mt-5">
        <li className="border-t border-t-[#ced4da] pt-2">
          <HousingEnvironemntQuestions />
        </li>
        <li className="border-t border-t-[#ced4da] pt-2">
          <HouseholdCompositionReview />
        </li>
        <li className="border-t border-t-[#ced4da] pt-2">
          <LifestyleCommitmentReview />
        </li>
        <li className="border-t border-t-[#ced4da] pt-2">
          <ExperienceExpectationsReview />
        </li>
        <li className="border-t border-t-[#ced4da] pt-2">
          <SpecificPreferencesReview />
        </li>
      </ol>
    </div>
  );
}

function HousingEnvironemntQuestions() {
  const [he1, he2, he3, he4, he5] = ["he1", "he2", "he3", "he4", "he5"].map((id) => SessionStorage.getItem(id));

  return (
    <div className="flex flex-col gap-2 text-[16px] text-black">
      <h3 className="text-xl font-semibold text-[#7C0F0F]">1. Housing Environment</h3>
      <p>
        <span className="font-semibold">Type: </span>
        {he2}
      </p>
      <p>
        <span className="font-semibold">Status: </span>
        {he1 === "rent-home" ? "Rent" : "Own"}
      </p>
      <div className="flex flex-col gap-2">
        {he3.type === "None" && (
          <p>
            <span className="font-semibold">Fench: </span>No
          </p>
        )}
        {he3.type !== "None" && (
          <>
            <p>
              <span className="font-semibold">Fench</span>: {he3.type}
            </p>
            <p>
              <span className="font-semibold">Height</span>: {he3.height} (meters)
            </p>
          </>
        )}
      </div>
      <p>
        <span className="font-semibold">Hours per day the pet will be left alone: </span>
        {he4}
      </p>
      <p>
        <span className="font-semibold">A room the pet will sleep: </span>
        {he5}
      </p>
    </div>
  );
}

function HouseholdCompositionReview() {
  const [hc1, hc2, hc3, hc4] = ["hc1", "hc2", "hc3", "hc4"].map((id) => SessionStorage.getItem(id));

  return (
    <div className="flex flex-col gap-2 text-[16px] text-black">
      <h3 className="text-xl font-semibold text-[#7C0F0F]">2. Household Composition</h3>

      {/* HC1 */}
      <div className="flex flex-col gap-2">
        <p>
          <span className="font-semibold">Adults: </span>
          {hc1.adults}
        </p>
        <p>
          <span className="font-semibold">Children: </span>
          {hc1.children}
        </p>
        {hc1.children > 0 && (
          <p>
            <span className="font-semibold">Youngest age: </span>
            {hc1.youngestAge}
          </p>
        )}
      </div>

      {/* HC2 */}
      <p>
        <span className="font-semibold">Allergies: </span>
        {hc2.length === 0 ? "None" : hc2.join(",")}
      </p>

      {/* HC3 */}
      <div>
        {hc3.length === 0 && (
          <p>
            <span className="font-semibold">Other pets: </span>
            None
          </p>
        )}
        {hc3.length !== 0 && (
          <>
            <p className="font-semibold">Other pets: </p>
            <ul>
              {hc3.map((pet, idx) => (
                <li key={idx}>{pet.type}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* HC4 */}
      <p>
        <span className="font-semibold">Pet before: </span>
        {hc4 === "" ? "No" : `Yes. ${hc4}`}
      </p>
    </div>
  );
}

function LifestyleCommitmentReview() {
  const [lc1, lc2, lc3, lc4, lc5] = ["lc1", "lc2", "lc3", "lc4", "lc5"].map((id) => SessionStorage.getItem(id));

  return (
    <div className="flex flex-col gap-2 text-[16px] text-black">
      <h3 className="text-xl font-semibold text-[#7C0F0F]">3. Lifestyle & Commitment</h3>

      {/* LC1 */}
      <p>
        <span className="font-semibold">Reason for pet adoption: </span>
        {lc1}
      </p>

      {/* LC2 */}
      <p>
        <span className="font-semibold">Hours with pet: </span>
        {lc2}
      </p>

      {/* LC3 */}
      <p>
        <span className="font-semibold">Active level: </span>
        {lc3}
      </p>

      {/* LC4 */}
      <div className="flex flex-col gap-2">
        {lc4.frequency === "Never" && (
          <p>
            <span className="font-semibold">Travel frequency: </span>
            {lc4.frequency}
          </p>
        )}
        {lc4.frequency !== "Never" && (
          <>
            <p>
              <span className="font-semibold">Travel frequency: </span>
              {lc4.frequency}
            </p>
            <p>
              <span className="font-semibold">Pet plan when travel frequency: </span>
              {lc4.plan}
            </p>
          </>
        )}
      </div>

      {/* LC5 */}
      <p>
        <span className="font-semibold">Prepared for the 10-20 year commitment </span>
        {lc5 === false ? "No" : "Yes"}
      </p>
    </div>
  );
}

function ExperienceExpectationsReview() {
  const [ee1, ee2, ee3, ee4] = ["ee1", "ee2", "ee3", "ee4"].map((id) => SessionStorage.getItem(id));

  return (
    <div className="flex flex-col gap-2 text-[16px] text-black">
      <h3 className="text-xl font-semibold text-[#7C0F0F]">4. Experience & Expectatation</h3>

      {/* EE1 */}
      <p>
        <span className="font-semibold">House-trained a pet or dealt with behavioral issues: </span>
        {ee1 === false ? "No" : "Yes"}
      </p>

      {/* EE2 */}
      <div>
        <p className="font-semibold">Actions when the pet developed expensive medical problems: </p>
        <ul className="list-disc list-inside">
          {ee2.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>

      {/* EE3 */}
      <div>
        <p className="font-semibold">Returning or rehoming the pet when: </p>
        <ul className="list-disc list-inside">
          {ee3.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>

      {/* EE4 */}
      <p>
        <span className="font-semibold">Afford routine and emergency veterinary care? </span>
        {ee4 === false ? "No" : "Yes"}
      </p>
    </div>
  );
}

function SpecificPreferencesReview() {
  const [sp1, sp2, sp3, sp4, sp5, sp6] = ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6"].map((id) =>
    SessionStorage.getItem(id)
  );

  return (
    <div className="flex flex-col gap-2 text-[16px] text-black">
      <h3 className="text-xl font-semibold text-[#7C0F0F]">5. Specific Preferences</h3>
      {/* SP1 */}
      <div>
        <p className="font-semibold">Prefer types: </p>
        <ul className="list-disc list-inside">
          {sp1.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
      {/* SP2 */}
      <div className="flex gap-1">
        <p className="font-semibold">Prefer ages (months): </p>
        <p>from {sp2.fromAge}</p>
        <p>to {sp2.toAge}</p>
      </div>
      {/* SP3 */}
      <div>
        <p className="font-semibold">Prefer sizes: </p>
        <ul className="list-disc list-inside">
          {sp3.map((size) => (
            <li key={size}>{size}</li>
          ))}
        </ul>
      </div>
      {/* SP4 */}
      <div>
        <p className="font-semibold">Prefer active levels: </p>
        <ul className="list-disc list-inside">
          {sp4.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ul>
      </div>
      {/* SP5 */}
      <p>
        <span className="font-semibold">Open to a pet that needs special medical care or behavioral training: </span>
        {sp5 === false ? "No" : "Yes"}
      </p>

      {/* SP6 */}
      <div>
        <p className="font-semibold">Handle barking, scratching furniture, or other normal pet behaviors: </p>
        <ul className="list-disc list-inside">
          {sp6.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReviewQuestions;

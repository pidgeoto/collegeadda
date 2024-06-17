import Image from "next/image";

const CollegeCard = ({ data }) => {
  const {
    name,
    imageUrl,
    course,
    accreditation,
    city,
    state,
    country,
    year,
    university,
    avgFees,
    // tags,
  } = data;
  const courseCount = course ? course.length : 0;
  const accreditations = accreditation ? accreditation.split(" | ") : [];

  return (
    <div className="shadow-md border rounded-md bg-gray-50 p-2 pb-4 w-full h-52 relative">
      {/* {tags && (
        <h6 className="text-xs px-2 py-2 shadow-sm border rounded-md bg-slate-100">
          {tags}
        </h6>
      )} */}
      <div className="flex flex-row items-center">
        <div className="h-40 w-40 my-4">
          <Image src={imageUrl} height={1000} width={1000} alt={name} />
          {year && (
            <div className="px-2 text-white text-center w-1/3 text-xs bg-[#4f2e8e] absolute left-3 bottom-2">
              Estd. {year}
            </div>
          )}
        </div>
        <div className="f-col w-2/3 ml-2">
          <div>
            <h4 className="font-medium">{name}</h4>
            {university !== "none" && (
              <h6 className="text-xs text-gray-500 ">{university}</h6>
            )}
            <h6 className="text-xs text-gray-400 mb-2">
              {city}, {state}, {country}
            </h6>
            {accreditations.length > 0 && (
              <div className="flex flex-row items-center gap-2 flex-wrap ">
                {accreditations.map((accreditation, index) => (
                  <div key={index}>
                    <h6 className="py-1 px-2 shadow-sm hover:shadow-lg border  text-sm rounded-lg cursor-default">
                      {accreditation.trim()}
                    </h6>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="f-between flex-row mt-2">
            {avgFees && (
              <div className="absolute bottom-2">
                <h6 className="text-sm">Avg. Fees : {avgFees}</h6>
              </div>
            )}
            <div className="p-2 rounded-md border bg-[#4f2e8e] text-white text-sm absolute right-2 bottom-2">
              Courses - {courseCount}+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;

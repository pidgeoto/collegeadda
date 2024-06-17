import dynamic from 'next/dynamic';
const CollegeList = dynamic(() => import("@/components/colleges/CollegeList"));


const Colleges = () => {
  return (
    <div>
      <div className="my-8">
        <CollegeList />
      </div>
    </div>
  );
};

export default Colleges;

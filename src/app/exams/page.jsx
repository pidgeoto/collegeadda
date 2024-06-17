import dynamic from 'next/dynamic';
const ExamList = dynamic(() => import("@/components/exams/ExamList"));

const Exams = () => {
  return (
    <div>
      <ExamList />
    </div>
  );
};

export default Exams;

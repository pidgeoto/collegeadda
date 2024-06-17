import dynamic from 'next/dynamic';
const CourseList = dynamic(() => import("@/components/courses/CourseList"));

const Courses = () => {
  return (
    <div>
      <CourseList />
    </div>
  );
};

export default Courses;

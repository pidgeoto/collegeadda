import Goal from "@/components/home/Goal";
import { Hero } from "@/components/home/Hero";
import HomeAd from "@/components/home/HomeAd";
import HomeCourses from "@/components/home/HomeCourses";
// import StudyAbroad from "@/components/home/StudyAbroad";
import Tags from "@/components/home/Tags";
import TopCollege from "@/components/home/TopCollege";
import TopCourses from "@/components/home/TopCourses";
import TopExams from "@/components/home/TopExams";
import { UniversitySlider } from "@/components/home/UniversitySlider";

export default function Home() {
  return (
    <div>
      <Hero />
      <Goal />
      <HomeCourses />
      <UniversitySlider />
      <Tags />
      <HomeAd />
      <TopCollege />
      <TopCourses />
      <TopExams />
      {/* <StudyAbroad /> */}
    </div>
  );
}

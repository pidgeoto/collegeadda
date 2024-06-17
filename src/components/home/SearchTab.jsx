import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseSearch from "./search/CourseSearch";
import CollegeSearch from "./search/CollegeSearch";
import ExamSearch from "./search/ExamSearch";
import ArticleSearch from "./search/ArticleSearch";

export function SearchTab() {
  return (
    <Tabs
      defaultValue="university"
      className="w-80 h-auto lg:w-[540px]   rounded-xl lg:my-4 py-6 px-8 lg:absolute"
    >
      <TabsList className="grid w-full grid-cols-4 bg-[#4f2e8e] text-white">
        <TabsTrigger value="college">College</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="exam">Exam</TabsTrigger>
        <TabsTrigger value="articles">Articles</TabsTrigger>
      </TabsList>
      <TabsContent value="college">
        <Card>
          <CardHeader className="f-center">
            <CardTitle>Search Colleges</CardTitle>
            <h6 className="text-sm font-normal">Start searching your colleges now and reach out to your favorite campus now</h6>
          </CardHeader>
          <CardContent className="space-y-2">
            <CollegeSearch />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="courses">
        <Card>
          <CardHeader className="f-center">
            <CardTitle>Search Courses</CardTitle>
            <h6 className="text-sm font-normal">Find out the perfect course here that will show the right direction for your future</h6>
          </CardHeader>
          <CardContent className="space-y-2">
            <CourseSearch />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="exam">
        <Card>
          <CardHeader className="f-center">
            <CardTitle>Search Exams</CardTitle>
            <h6 className="text-sm font-normal">Exams are another name of stress! Why to take stress when you can clear all your doubts here</h6>
          </CardHeader>
          <CardContent className="space-y-2">
            <ExamSearch />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="articles">
        <Card>
          <CardHeader className="f-center">
            <CardTitle>Search Articles</CardTitle>
            <h6 className="text-sm font-normal">Confused about higher education, check the information here, that will navigate you to the world articles related to your query</h6>
          </CardHeader>
          <CardContent className="space-y-2">
            <ArticleSearch />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";

const CollegeIndividual = ({ college }) => {
  return (
    <div>
      <div key={college?.customId} className="f-between pt-4">
        <h4 className="text-lg font-semibold mb-2">{college?.name}</h4>
        <h6 className="text-sm text-gray-500">{college.customId}</h6>
        <h6 className="text-blue-500">{college.name}</h6>
        <h6 className="text-blue-500">Ranking : {college.ranking}</h6>
        <h6 className="text-blue-500">Estd : {college.foundedYear}</h6>
      </div>
      <Tabs defaultValue="info" className="w-full py-4">
        <TabsList className="grid w-full grid-cols-5 rounded-md bg-[#4f2e8e] text-white">
          {college.keyArticle?.info && (
            <TabsTrigger value="info" className="rounded-md">
              Info
            </TabsTrigger>
          )}
          {college.keyArticle?.coursesAndFees && (
            <TabsTrigger value="course" className="rounded-md">
              Course & Fees
            </TabsTrigger>
          )}
          {college.keyArticle?.placement && (
            <TabsTrigger value="placement" className="rounded-md">
              Placement
            </TabsTrigger>
          )}
          {college.keyArticle?.admission && (
            <TabsTrigger value="admission" className="rounded-md">
              Admissions
            </TabsTrigger>
          )}
          {college.keyArticle?.faq && (
            <TabsTrigger value="faq" className="rounded-md">
              FAQ
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="info">
          {college.keyArticle?.info && (
            <Card className="p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: college.keyArticle?.info }} />
            </Card>
          )}
        </TabsContent>
        <TabsContent value="course">
          {college.keyArticle?.coursesAndFees && (
            <Card className="p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: college.keyArticle?.coursesAndFees }} />
            </Card>
          )}
        </TabsContent>
        <TabsContent value="placement">
          {college.keyArticle?.placement && (
            <Card className="p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: college.keyArticle?.placement }} />
            </Card>
          )}
        </TabsContent>
        <TabsContent value="admission">
          {college.keyArticle?.admission && (
            <Card className="p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: college.keyArticle?.admission }} />
            </Card>
          )}
        </TabsContent>
        <TabsContent value="faq">
          {college.keyArticle?.faq && (
            <Card className="p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: college.keyArticle?.faq }} />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeIndividual;

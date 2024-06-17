import React from "react";
import { Button } from "../ui/button";
import { LeadModal } from "./LeadModal";

const Goal = () => {
  return (
    <div className="f-between">
      <div>
        <h1>Select Your Study Goal</h1>
        <h6>
          At the Academy, we strive to bring together the best professors for
          the best courses
        </h6>
        <Button className="my-8">Explore Now</Button>
      </div>
      {/* <div><LeadModal /></div> */}
    </div>
  );
};

export default Goal;

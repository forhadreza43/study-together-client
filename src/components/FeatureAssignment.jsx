import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";

import axios from "axios";
import useAuth from "../hook/useAuth";
import { Link, Navigate } from "react-router";
import AssignmentCardSkeleton from "./skeleton/AssignmentCardSkeleton";
const FeatureAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/assignments`).then((res) => {
      // Shuffle and pick 6 random assignments
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      setAssignments(shuffled.slice(0, 6));
    });
  }, []);

  return (
    <div className="w-11/12 lg:w-full mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6 text-left dark:text-white">
          Featured Assignments
        </h2>
        <span className="text-blue-500">
          <Link to="/assignments">See More</Link>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!assignments.length && (
          <>
            <AssignmentCardSkeleton />
            <AssignmentCardSkeleton />
            <AssignmentCardSkeleton />
          </>
        )}
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            user={user || {}}
            onDeleteClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureAssignment;

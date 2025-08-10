import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import useAuth from "../hook/useAuth";
import axios from "axios";

const RecentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/assignments`).then((res) => {
      // Sort by most recent (assuming assignments have a createdAt or dueDate field)
      const sorted = res.data.sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
      setAssignments(sorted.slice(0, 6));
    });
  }, []);

  return (
    <div className="w-11/12 lg:w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-left dark:text-white">
        Recent Assignments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default RecentAssignment;

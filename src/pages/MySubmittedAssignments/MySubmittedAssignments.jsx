import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import useAxiosSecure from "../../hook/useAxiosSecure";
import MySubmittedAssignmentsSkeleton from "../../components/skeleton/MySubmittedAssignmentsSkeleton";

const MySubmittedAssignments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submittedAssignments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/submitted-assignments?email=${
          user?.email
        }`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // if (isLoading) return <Loading />;

  return (
    <div className="w-full mx-auto ">
      {user && !isLoading && submissions.length === 0 && <NotFound />}
      <>
        <h2 className="text-3xl font-bold mt-10 mb-6 text-center text-gray-900 dark:text-gray-100">
          My Assignments
        </h2>
        {(!user || isLoading) && <MySubmittedAssignmentsSkeleton />}
        {user && !isLoading &&  
          <div className="overflow-x-auto dark:text-gray-300">
            <table className="table w-full">
              <thead className="bg-base-200 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th>#</th>
                  <th>Assignment Title</th>
                  <th>Status</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission._id}>
                    <td>{index + 1}</td>
                    <td>{submission.assignmentTitle || "N/A"}</td>
                    <td className="capitalize">{submission.status}</td>
                    <td>{submission.assignmentMarks || "N/A"}</td>
                    <td>{submission.obtainedMarks ?? "-"}</td>
                    <td>{submission.feedback ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </>
    </div>
  );
};

export default MySubmittedAssignments;

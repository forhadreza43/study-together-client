import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import PendingAssignmentsSkeleton from "../../components/skeleton/PendingAssignmentsSkeleton";

const PendingAssignments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ obtainedMarks: "", feedback: "" });
  const axiosSecure = useAxiosSecure();

  const { data: pendingAssignments = [], isLoading } = useQuery({
    queryKey: ["pendingAssignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/pending-submitted-assignments?email=${
          user?.email
        }`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: ({ id, ...data }) =>
      axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/submitted-assignments/${id}`,
        data
      ),
    onSuccess: () => {
      toast.success("Marked successfully!");
      queryClient.invalidateQueries(["pendingAssignments"]);
      setSelected(null);
      setForm({ obtainedMarks: "", feedback: "" });
    },
    onError: () => {
      toast.error("Marking failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.obtainedMarks || !form.feedback) {
      return toast.error("Both fields are required");
    }

    mutation.mutate({
      id: selected._id,
      obtainedMarks: Number(form.obtainedMarks),
      feedback: form.feedback,
    });
  };

  // if (isLoading) return <Loading />;
  return (
    <div className="w-full mx-auto mt-10">
      <>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Pending Assignments
        </h2>
        {(!user || isLoading) && <PendingAssignmentsSkeleton />}

        {!isLoading && pendingAssignments.length > 0 && (
          <div className="overflow-x-auto dark:text-gray-300">
            <table className="table w-full">
              <thead className="bg-base-200 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="w-10">#</th>
                  <th>Title</th>
                  <th>Submitted At</th>
                  <th>Doc Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAssignments.map((assignment, index) => (
                  <tr key={assignment._id}>
                    <td>{index + 1}</td>
                    <td>{assignment.title}</td>
                    <td>{new Date(assignment.submittedAt).toLocaleString()}</td>
                    <td>
                      <a
                        href={assignment.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Submission
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelected(assignment)}
                      >
                        Mark
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {user && !isLoading && pendingAssignments.length === 0 && <NotFound />}
      </>

      {/* Modal */}
      {selected && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-md dark:text-gray-300 dark:bg-gray-700">
            <h3 className="font-bold text-lg">Mark Assignment</h3>
            <p className="text-sm mt-2">
              <strong>Docs:</strong>{" "}
              <a
                href={selected.docLink}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Submission
              </a>
            </p>
            <p className="text-sm mt-2">
              <strong>Note:</strong> {selected.note}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="number"
                placeholder="Obtained Marks"
                className="input input-bordered w-full"
                value={form.obtainedMarks}
                onChange={(e) =>
                  setForm({ ...form, obtainedMarks: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Feedback"
                className="input input-bordered w-full"
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              />
              <div className="modal-action justify-between">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingAssignments;

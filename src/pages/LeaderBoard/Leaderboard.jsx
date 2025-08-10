import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import LeaderboardSkeleton from "../../components/skeleton/LeaderboardSkeleton";

const fetchLeaderboard = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/leaderboard?page=${page}`
  );
  return data;
};

const Leaderboard = () => {
  const [page, setPage] = useState(1);

  const {
    data: leaderboard = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leaderboard", page],
    queryFn: fetchLeaderboard,
    keepPreviousData: true,
  });

  // if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load leaderboard: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-10 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
        Leaderboard
      </h2>
      {isLoading && <LeaderboardSkeleton />}
      {!isLoading && (
        <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Assignments</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, idx) => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {(page - 1) * 10 + idx + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.assignmentCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between max-w-sm mt-10 mx-auto">
        <button
          className="btn btn-primary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          className="btn btn-primary"
          disabled={leaderboard.length < 10}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;

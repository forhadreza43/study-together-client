const LeaderboardSkeleton = () => {
  return (
    <div className="w-full mx-auto mt-10 animate-pulse">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-300 dark:text-gray-600">
        &nbsp;
      </h2>
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900">
            {["#", "Name", "Email", "Assignments"].map((_, i) => (
              <th key={i} className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between max-w-sm mt-10 mx-auto">
        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;

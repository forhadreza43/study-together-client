const PendingAssignmentsSkeleton = () => {
  return (
    <div className="w-full mx-auto mt-10 animate-pulse">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-300 dark:text-gray-600">
        &nbsp;
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200 dark:bg-gray-700">
            <tr>
              <th className="w-10">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
              <th>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
              <th>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
              <th>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
              <th>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
                <td>
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingAssignmentsSkeleton;

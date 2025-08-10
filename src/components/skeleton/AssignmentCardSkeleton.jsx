const AssignmentCardSkeleton = () => {
  return (
    <div className="rounded bg-base-100 dark:bg-gray-900 shadow-lg border border-blue-300 p-4 flex flex-col justify-between animate-pulse">
      <div>
        <div className="rounded w-full h-40 bg-gray-300 dark:bg-gray-700" />
        <div className="my-3 space-y-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="h-8 rounded bg-gray-300 dark:bg-gray-700 w-16"></div>
        <div className="h-8 rounded bg-gray-300 dark:bg-gray-700 w-16"></div>
        <div className="h-8 rounded bg-gray-300 dark:bg-gray-700 w-16"></div>
      </div>
    </div>
  );
};

export default AssignmentCardSkeleton;

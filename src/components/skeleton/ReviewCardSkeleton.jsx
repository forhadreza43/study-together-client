const ReviewCardSkeleton = () => {
  return (
    <div className="border w-full border-gray-300 dark:border-none p-3 rounded dark:bg-gray-900 animate-pulse">
      <div className="flex items-center gap-3 mb-2 pb-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
    </div>
  );
};

export default ReviewCardSkeleton;

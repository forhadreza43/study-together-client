import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading";
import ReviewCardSkeleton from "../components/skeleton/ReviewCardSkeleton";

const fetchReviews = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/reviews?limit=12&page=${page}`
  );
  return data;
};

const ReviewsPage = () => {
  const [page, setPage] = useState(1);

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", page],
    queryFn: fetchReviews,
    keepPreviousData: true,
  });

  // if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load reviews: {error.message}
      </div>
    );
  }

  if (reviews.length === 0 && !isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500">No reviews found.</div>
    );
  }

  return (
    <div className="lg:w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
        All Reviews
      </h2>
      <div className="gap-3 mb-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <>
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </>
        )}
        {!isLoading && reviews.length > 0 && reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
      <div className="flex justify-between max-w-sm mx-auto mt-10">
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
          disabled={reviews.length < 12}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;

const ReviewCard = ({ review }) => {
  return (
    <div className="border w-full border-gray-300 dark:border-none p-3 rounded dark:bg-gray-900">

        <div className="flex items-center gap-3 mb-2 pb-2 ">
          <img
            className="w-10 h-10 rounded-full"
            src={review.image}
            alt={review.name}
          />
          <strong className="dark:text-white">{review.name}</strong>
        </div>
        <p className="dark:text-white">{review.text}</p>

    </div>
  );
};

export default ReviewCard;

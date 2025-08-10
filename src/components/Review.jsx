import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hook/useAuth";
import { Link, useNavigate } from "react-router";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews?limit=6`)
      .then((res) => setReviews(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    }
    if (user && text) {
      const review = {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        text,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, review);
    }
  };

  return (
    <div className="w-11/12 lg:w-full mx-auto mt-10">

      <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-6 text-left dark:text-white">
                User Reviews
              </h2>
              <span className="text-blue-500">
                <Link to="/reviews">See More</Link>
              </span>
            </div>

      <div className="gap-3 flex mb-3">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <textarea
          className="textarea border border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white"
          placeholder="Your Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button
          disabled={!text || !user}
          type="submit"
          className="btn btn-primary"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;

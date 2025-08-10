import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add API call here
    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 dark:bg-gray-900 p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Subscribe to our Newsletter
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="input input-bordered"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="text-green-600 mt-4 text-center">
          Thank you for subscribing!
        </p>
      )}
    </div>
  );
};

export default NewsLetter;

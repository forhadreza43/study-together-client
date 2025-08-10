import { useNavigate } from "react-router";

const AssignmentCard = ({ assignment, user, onDeleteClick }) => {
  const navigate = useNavigate();
  const isOwner =
    user && user.email && user.email === assignment.creator?.email;

  return (
    <div className="rounded dark:border-none bg-base-100 dark:bg-gray-900 shadow-lg border border-blue-300 p-4 flex flex-col justify-between ">
      <div>
        <img
          src={assignment.thumbnail}
          alt={assignment.title}
          className="rounded w-full object-cover"
        />
        <div className="my-3 dark:text-gray-300">
          <h2 className="text-xl font-semibold">{assignment.title}</h2>
          <p>Marks: {assignment.marks}</p>
          <p>
            Difficulty:{" "}
            <span className="capitalize">{assignment.difficulty}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/assignment/${assignment._id}`)}
          className="btn border-none dark:bg-blue-500 bg-primary text-white btn-sm"
        >
          View
        </button>

        <button
          onClick={() => navigate(`/update/${assignment._id}`)}
          className="btn btn-outline dark:border-white hover:text-white dark:text-white hover:bg-blue-500 btn-sm"
        >
          Update
        </button>

        {isOwner && (
          <button
            onClick={() => onDeleteClick(assignment._id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
import React from 'react';
import './RightSidebar.css'; // Import the CSS for styling
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RightSidebar = ({ book, video }) => {
  const { studyPlans } = useSelector((state) => state.studyPlan);
  const navigate = useNavigate();

  return (
    <div className="right-sidebar">
      {/* Conditionally render Video Info */}
      {video && (
        <>
          <div className="sidebar-card">
            <h5>Video Info</h5>
            <hr />
            <p>{video?.title}</p>
          </div>
          <div className="sidebar-card">
            <h5>Creator Info</h5>
            <hr />
            <p>{video?.creators_origin?.[0]}</p>
          </div>
        </>
      )}

      {/* Conditionally render Book Info */}
      {book && (
        <>
          <div className="sidebar-card">
            <h5>Book Info</h5>
            <hr />
            <p>{book?.title}</p>
          </div>
          <div className="sidebar-card">
            <h5>Author Info</h5>
            <hr />
            <p>{book?.author?.[0]}</p>
          </div>
        </>
      )}

      {/* Always render Study Plans and Previously Viewed sections */}
      <div className="sidebar-card">
        <h5>Study Plans</h5>
        <hr />
        {studyPlans.length > 0 ? (
          <ul>
            {studyPlans.map((plan) => (
              <li key={plan?._id} onClick={() => navigate(`/study-plans/${plan?._id}`)}>
                {plan.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No study plans available.</p>
        )}
        <p>Add book to your study plan.</p>
        <button className="add-book">Add a book</button>
      </div>

      <div className="sidebar-card">
        <h5>Previously Viewed</h5>
        <hr />
        <p>Your view history will show here...</p>
      </div>
    </div>
  );
};

export default RightSidebar;

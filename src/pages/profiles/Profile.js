import React from 'react'
import styles from '../../styles/Profile.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from "../../components/Avatar";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

/**
 * The Profile component displays user profile information
 * and follow/unfollow buttons
 */
const Profile = (props) => {
  const { profile, mobile, imageSize=55 } = props;
  // Extract profile details
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Get follow/unfollow handlers from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}
    >
      {/* Link to the user's profile page */}
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && 'ml-auto'}`}>
        {/* Show follow/unfollow buttons for other users */}
        {!mobile && currentUser && !is_owner && (
          following_id ? (
            //Show the unfollow button if user is already followed
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            // Show the follow button for user not being followed
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          )
        )}
      </div>
  </div>
  );
};

export default Profile
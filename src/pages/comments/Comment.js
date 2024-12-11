import React, { useState } from 'react'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import CommentEditForm from './CommentEditForm';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'

/**
 * The Comment Component displays a single comment with edit and delete
 * options if the user is the comment owner.
 * Displays an avatar, username, timestamp and the comment content.
 */
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  // State to toggle the edit form
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /**
   * Deletes the comment and updates the post's comment count
   * and comments list.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`)
      setPost(prevPost => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch(err){}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
            {/* Display owner name and timestamp */}
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
        {/* Edit form or content */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Dropdownn for Edit/Delete options if the user owns the comment */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment
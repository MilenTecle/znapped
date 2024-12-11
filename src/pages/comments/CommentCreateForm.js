import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { axiosReq } from "../../api/axiosDefaults";
import { Mention, MentionsInput } from "react-mentions";

/**
 * CommentCreateForm allows users to create new comments for a specific post.
 * Users can mention other users, using @.
 */
function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [mentionUsernames, setMentionUsernames] = useState([]);
  const [users, setUsers] = useState([]);

  /**
   * Fetch user profiles when the component mounts.
   */
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setUsers(
          data.results.map((user) => ({
            id: user.id,
            display: user.owner,
          }))
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchProfiles();
  }, []);

  // Updates the comment content as the user types.
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    };
  };

  /**
   * Submits the comment to the backend and updates the comments list,
   * and post's comment count.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract mentions from content using regular expression
    const extractMentions = [...new Set((content.match(/@(\w+)/g) || []).map(m => m.slice(1)))]
    console.log("Extraced mentions", extractMentions)
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
        mention_usernames: extractMentions, // Include mentioned usernames
      });
      // Update the comments lists
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update the post's comment count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      setMentionUsernames([]);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <MentionsInput
            className={`${styles.CommentMentionsInput} ${styles.Form}`}
            value={content}
            onChange={handleContentChange}
            placeholder="Type @ for mentions"
            rows={2}
          >
            {/* Mention component for displaying user suggestions */}
            <Mention
              trigger="@"
              data={users}
              markup="@__display__"
              displayTransform={(id, display) => `@${display}`}
              className={styles.CommentMention}
            />
          </MentionsInput>
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
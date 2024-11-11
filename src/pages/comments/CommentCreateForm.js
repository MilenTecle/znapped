import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { axiosReq } from "../../api/axiosDefaults";
import { Mention, MentionsInput } from "react-mentions";


function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [mentionUsernames, setMentionUsernames] = useState([]);
  const [users, setUsers] = useState([]);

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

  const handleContentChange = (event, newValue, plainTextValue) => {
    setContent(plainTextValue);

    const mentions = plainTextValue.match(/@\w+/g) || [];
    setMentionUsernames(mentions.map((mention) => mention.slice(1)));
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


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
        mention_usernames: mentionUsernames,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
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
            <Mention
              trigger="@"
              data={users}
              markup="@{{__display__}}"
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
import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import { Mention, MentionsInput } from "react-mentions";


function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    hashtagNames: "",
  });

  const { title, content, image, hashtagNames } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const [hashtags, setHashtags] = useState([]);

  // Fetch the existing post data when the component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`)
        const { title, content, image, is_owner, hashtags } = data;

        const formattedHashtags = hashtags
          .map((hashtag) => `#${hashtag.name}`.replace(/^#+/, "#"))
          .join(" ");

        /**
         * If user is the owner, populate the form with the post data
         * otherwise redirect.
         */
        is_owner ? setPostData({ title, content, image, hashtagNames: formattedHashtags, }) : history.push("/");
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    handleMount();
  }, [history, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hashtag suggestions
        const { data: hashtagData } = await axiosReq.get("posts/hashtags/");
        const validHashtags = hashtagData.results
          .filter((hashtag) => (hashtag.name).trim())
          .map((hashtag) => ({
            id: hashtag.id,
            display: `#${hashtag.name.replace(/^#+/, "#")}`,
          }));
        setHashtags(validHashtags)
      } catch (err) {
        console.error("Error fetching hashtags:", err);
      }
    };

    fetchData();
  }, []);

  // Handle changes to text fields (title, content)
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle changes to the hashtag input
  const handleHashtagChange = (event) => {
    setPostData({
      ...postData,
      hashtagNames: event.target.value,
    });
  };

  // Handle image file input and update the image state
  const handleChangeImage = (event) => {
    try {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        setPostData({
          ...postData,
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    } catch (err) {
      console.error("Error updating the image:", err);
    }
  };

  // Handles the "Enter" key press to submit the form
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    };
  };

  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    formData.append(
      "hashtag_names",
      hashtagNames
        .split(/[\s,]+/)
        .map((name) => name.trim().replace(/^#+/, "#"))
        .filter((name) => name)
        .join(" ")
    );

    // Send PUT request to update the post
    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Hashtags</Form.Label>
        <MentionsInput
          className={styles.MentionsInput}
          value={hashtagNames}
          name="hashtagNames"
          onChange={handleHashtagChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g., #travel, #food"
        >
          <Mention
            trigger="#"
            data={hashtags}
            className={styles.HighlightedHashtag}
            markup="#__display__"
          />
        </MentionsInput>
      </Form.Group>
      {errors?.hashtagNames?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
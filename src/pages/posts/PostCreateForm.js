import React, { useRef, useState, useEffect } from "react";

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
import { useRedirect } from "../../hooks/useRedirect";
import { Mention, MentionsInput } from "react-mentions";


function PostCreateForm() {
  useRedirect('loggedOut');
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    video: "",
    hashtagNames: "",
  });

  const { title, content, image, video, hashtagNames } = postData;
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: hashtagData } = await axiosReq.get("/hashtags/");
        console.log("Fetched data:", hashtagData)
        setHashtags(
          hashtagData.results.map((hashtag) => ({
            id: hashtag.id,
            display: hashtag.name,
          }))
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const imageInput = useRef(null);
  const videoInput = useRef(null)
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleHashtagChange = (event) => {
    console.log("Input:", event.target.value)
    setPostData({
      ...postData,
      hashtagNames: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
        video: "",
      });
    }
  };

  const handleChangeVideo = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(video);
      setPostData({
        ...postData,
        video: URL.createObjectURL(event.target.files[0]),
        image: "",
      });
    }
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput.current && imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    } else if (videoInput.current && videoInput.current.files[0]) {
      formData.append("video", videoInput.current.files[0]);
    }

    formData.append(
      "hashtag_names",
      hashtagNames.split(" ").map((name) => name.trim()).filter((name) => name));

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      // console.log(err);
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
          onChange={handleHashtagChange}
          onKeyDown={handleKeyDown}
          placeholder="Type # for hashtags"
        >
          <Mention
            trigger="#"
            data={hashtags}
            className={styles.hashtag}
            markup="#__display__"
            displayTransform={(display) => `#${display}`}
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
        create
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
              {!image && (
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
              {!video && (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="video-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload a video"
                  />
                </Form.Label>
              )}
              {video ? (
                <div>
                  <video
                    controls
                    src={video}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="video-upload"
                  >
                    Change the video
                  </Form.Label>
                </div>
              ) : image ? (
                <div>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="image-upload"
                  >
                    Change the image
                  </Form.Label>
                </div>
              ) : null}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                style={{ display: 'none' }}
              />
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.File
                id="video-upload"
                accept="video/*"
                onChange={handleChangeVideo}
                ref={videoInput}
                style={{ display: 'none' }}
              />
              {errors?.video?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form >
  );
}

export default PostCreateForm;
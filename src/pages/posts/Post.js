import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useState } from "react";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
    reaction_type,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [currentReaction, setCurrentReaction] = useState(reaction_type)

  const reactions = [
    { name: "heart", icon: "fas fa-heart", color: "#f85032" },
    { name: "thumbs_up", icon: "fas fa-thumbs-up", color:"#ffd700" },
    { name: "laugh", icon: "fas fa-laugh", color:"#ffd700"  },
    { name: "sad", icon: "fas fa-sad-tear", color:"#ffd700"  },
    { name: "angry", icon: "fas fa-angry", color: "#ff6347" },
  ];

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async (reactionType) => {
    console.log("Reaction Type:", reactionType);
    console.log("Post ID", id);
    try {
      if (currentReaction === reactionType) {
        await handleUnlike();
      } else {
        const { data } = await axiosRes.post("/likes/", {
          post: id,
          reaction_type: reactionType
        });
        setCurrentReaction(reactionType);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) =>
            post.id === id
              ? {
                ...post,
                likes_count: post.likes_count + 1,
                like_id: data.id,
                reaction_type: reactionType
              }
              : post
          ),
        }));
      }
    } catch (error) {
      console.log("Error posting like:", error.response ? error.response.data : error.message);
    }
  };


  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setCurrentReaction(null)
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? {
              ...post,
              likes_count: post.likes_count - 1,
              like_id: null,
              reaction_type: null
            }
            : post
        ),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : (
            <div className={styles.Reactions}>
              {reactions.map((reaction) => (
                <OverlayTrigger
                  key={reaction.name}
                  placement="top"
                  overlay={<Tooltip>{reaction.name}</Tooltip>}
                >
                  <span onClick={() =>
                    currentReaction === reaction.name
                      ? handleUnlike()
                      : handleLike(reaction.name)
                  }
                    className={`${styles.Reaction} ${currentReaction === reaction.name
                      ? styles.ActiveReaction
                      : ""
                      }`}
                  >
                    <i
                      className={reaction.icon}
                      style={{ color: reaction_type === reaction.name ? reaction.color: "#cfced3"}}
                    />
                  </span>
                </OverlayTrigger>
              ))}
              <span>{likes_count}</span>
            </div>
          )}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
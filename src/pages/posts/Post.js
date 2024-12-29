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
    hashtags = [],
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Reaction options for liking a post
  const reactions = [
    { name: "heart", icon: "fas fa-heart" },
    { name: "thumbs_up", icon: "fas fa-thumbs-up" },
    { name: "laugh", icon: "fas fa-laugh" },
    { name: "sad", icon: "fas fa-sad-tear" },
    { name: "angry", icon: "fas fa-angry" },
  ];

  // Navigate to edit page for the post
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Delete a post and navigate back
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Handle adding a reaction/like to a post
  const handleLike = async (reactionType) => {
    try {
      if (reaction_type === reactionType) {
        await handleUnlike(); // Remove the reaction if it's the same
      } else {
        if (like_id) {
          await handleUnlike(); // Remove any existing reaction
        }
      }
      const { data } = await axiosRes.post("/likes/", {
        post: id,
        reaction_type: reactionType
      });

      // Update the post's state with the new like/reaction
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
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  // Handle removing a like/reaction
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
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
      console.error("Error removing reaction:", err);
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
            {/* Display dropdown for delete/edit if user is the post owner */}
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
        {/* Display hashtags */}
        <div className={styles.HighlightedHashtag}>
          {hashtags.map((hashtag) => (
            <Link
              to={`/?hashtag=${hashtag.name}`}
              key={hashtag.id}
            >
              #{hashtag.name}{" "}
            </Link>
          ))}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : (
            <div className={styles.Reactions}>
              {/* Reaction icon options */}
              {reactions.map((reaction) => (
                <OverlayTrigger
                  key={reaction.name}
                  placement="top"
                  overlay={<Tooltip>{reaction.name}</Tooltip>}
                >
                  <span onClick={() =>
                    reaction_type === reaction.name
                      ? handleUnlike()
                      : handleLike(reaction.name)
                  }
                    className={`${styles.Reaction} ${reaction_type === reaction.name
                      ? styles.ActiveReaction
                      : ""
                      } ${styles[reaction.name]}`}
                  >
                    <i
                      className={reaction.icon}
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
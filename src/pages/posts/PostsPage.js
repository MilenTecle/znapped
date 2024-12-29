import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  // React Router's hook to get current location and query parameter
  const location = useLocation();
  const { pathname } = location;

  // Extracts hashtag from the URL query parameters
  const hashtag = new URLSearchParams(location.search).get("hashtag");

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    // Fetch posts based on filter, search query and hashtags
    const fetchPosts = async () => {
      try {
        // If a search term exists, add it to the URL
        const queryParam = query ? `search=${query}&` : "";
        // If a hashtag exists, add it to the URL
        const hashtagParam = hashtag ? `hashtags__name=${hashtag}&` : "";

        // Send GET request to fetch posts
        const { data } = await axiosReq.get(`/posts/?${filter}${queryParam}${hashtagParam}`);
        // Update posts state
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    setHasLoaded(false);
    // Delay fetching posts to avoid excessive API calls
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, hashtag]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        {/* Displays the title if a hashtag is present */}
        {hashtag && <h1>Posts tagged with #{hashtag}</h1>}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {/* Check if posts are available */}
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    // Update teh state with new data while avoiding duplicates.
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // Check if the current result already exists in the previous results.
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
    // update its followers count and set its following id
    {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    }
    : profile.is_owner
      ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
      : // This is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
    // update its followers count and set its following id
    {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    }
    : profile.is_owner
      ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
      : // This is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

/**
 * Decode the refresh token to get its expiration timestamp
 * Store the expiration timestamp in localStorage for future checks.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Retrieve the refresh token's expiration timestamp from localStorage.
 * If the timestamp is not available, token refresh is not needed.
 */
export const shouldRefreshToken = () => {
  const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
  if (!refreshTokenTimestamp) {
    return false;
  }
  // Get the current time in seconds.
  const now = Math.floor(Date.now() / 1000);
  // Return true if the current time is greater than,
  // or equal to the token expiration.
  return now >= parseInt(refreshTokenTimestamp, 10);
};

//Remove the refresh token timestamp from localStorage.
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
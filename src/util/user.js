import { api } from "../util/api";

export const getAllPosts = () => {
  return api.get(`/user/all-posts`, {});
};
export const getAllDiscussionPosts = () => {
  return api.get(`/user/all-discussion-posts`, {});
};
export const getAllDiscussionComments = (id,token) => {
  return api.get(`/user/discussion-comments`, {
    headers: {
      auth: token
    }
  });
};



export const deletePost = (id, token) => {
  return api.delete(`/user/posts/${id}`, {
    headers: {
      auth: token,
    },
  });
};
export const signin = (params) => {
  return api.post("/user/signin", params);
};
export const register = (params) => {
  return api.post("/user/signup", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

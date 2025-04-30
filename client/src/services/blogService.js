import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Updated getAuthHeader function with 'Content-Type' header
const getAuthHeader = (token) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Added Content-Type header
    }
  };
};

// ✅ Updated to use params correctly, including userId when provided
export const getBlogs = async (page = 1, limit = 10, userId = null) => {
  const params = new URLSearchParams({
    page,
    limit,
    ...(userId && { userId }) // Only add userId if it exists
  });

  const response = await axios.get(`${API_URL}/blogs?${params}`);
  return response.data;
};

export const getBlog = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData, token) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData, getAuthHeader(token));
  return response.data;
};

// Updated updateBlog to include the new getAuthHeader function with Content-Type
export const updateBlog = async (id, blogData, token) => {
  const response = await axios.put(
    `${API_URL}/blogs/${id}`,
    blogData,
    getAuthHeader(token)  // Added authorization header with Content-Type
  );
  return response.data;
};

// Updated deleteBlog to include the new getAuthHeader function with Content-Type
export const deleteBlog = async (id, token) => {
  const response = await axios.delete(
    `${API_URL}/blogs/${id}`,
    getAuthHeader(token)  // Added authorization header with Content-Type
  );
  return response.data;
};

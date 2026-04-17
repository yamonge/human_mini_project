import axios from "axios";

const BASE_URL = "http://localhost:8111";

const AxiosApi = {
  // 회원가입
  signUp: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "회원가입 실패";
      return errorMessage;
    }
  },
  // 로그인
  login: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "로그인 실패";
      return errorMessage;
    }
  },

  // 댓글 등록
  createComment: async (comment, postId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/posts/${postId}/comments`,
        comment,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "댓글 등록 실패";
      return errorMessage;
    }
  },

  // 댓글 목록 조회
  getCommentList: async (postId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/posts/${postId}/comments`,
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "댓글 목록 조회 실패";
      return errorMessage;
    }
  },

  // 뮤지컬 전체 목록 조회
  getMusicalList: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/musicals`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "뮤지컬 목록 조회 실패";
      return errorMessage;
    }
  },

  // 뮤지컬 단건 조회
  getMusical: async (musicalId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/musicals/${musicalId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "뮤지컬 단건 조회 실패";
      return errorMessage;
    }
  },

  // 뮤지컬 제목 검색
  searchMusical: async (keyword) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/musicals/search?keyword=${keyword}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "뮤지컬 제목 검색 실패";
      return errorMessage;
    }
  },

  // 게시글 등록
  createPost: async (post) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/posts`, post);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "게시글 등록 실패";
      return errorMessage;
    }
  },

  // 게시글 전체 목록 조회
  getPostList: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "게시글 목록 조회 실패";
      return errorMessage;
    }
  },

  // 게시글 단건 조회
  getPost: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "게시글 단건 조회 실패";
      return errorMessage;
    }
  },

  // 리뷰 등록
  createReview: async (review, musicalId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/musicals/${musicalId}/reviews`,
        review,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "리뷰 등록 실패";
      return errorMessage;
    }
  },

  //리뷰 목록 조회
  getReviewList: async (musicalId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/musicals/${musicalId}/reviews`,
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "리뷰 목록 조회 실패";
      return errorMessage;
    }
  },

  // 아이디 찾기
  findId: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/findId`, user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "아이디 찾기 실패";
      return errorMessage;
    }
  },

  // 비밀번호 찾기
  findPw: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/findPw`, user);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "비밀번호 찾기 실패";
      return errorMessage;
    }
  },
};

export default AxiosApi;

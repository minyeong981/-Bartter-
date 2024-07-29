import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import CommunityImage from '@/assets/image/동네모임1.png';
import UserImage from '@/assets/image/유저.png';

interface SimpleUser {
  userId: number;
  nickname: string;
  profileImage: string;
}

interface SimpleLocation {
  locationId: number;
  locationName: string;
}

interface SimpleImage {
  imageId: number;
  imageUrl: string;
  imageOrder: number;
}

export interface Comment {
  user: SimpleUser;
  content: string;
  created_at: string;
}

export interface CommunityPost {
  communityPostId: number;
  user: SimpleUser;
  location: SimpleLocation;
  title: string;
  content: string;
  likeCount: number;
  commentList: Comment[];
  imageList: SimpleImage[];
  created_at: string;
}

interface CreatePost {
  userId: number;
  title: string;
  content: string;
  images: SimpleImage[];
}

interface CommunityStore {
  posts: CommunityPost[];
  addPost: (newPost: CreatePost) => void;
  deletePost: (postId: number) => void;
}

const initialPost : CommunityPost= {
  communityPostId: 1,
  user: {userId: 0, nickname: 'user0', profileImage: UserImage},
  location: {locationId: 0, locationName:'광주 장덕동'},
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  likeCount: 12,
  commentList: [
    {
      user: {userId: 1, nickname: 'user1', profileImage: UserImage},
      content: '댓글1',
      created_at: '2024-07-03',
    },
    {
      user: {userId: 1, nickname: 'user2', profileImage: UserImage},
      content: '댓글2',
      created_at: '2024-07-03',
    },
  ],
  imageList: [
    {imageId: 1, imageUrl: CommunityImage, imageOrder: 1},
    {
      imageId: 2,
      imageUrl: CommunityImage,
      imageOrder: 2,
    },
  ],
  created_at: '2024-05-20',
};

const useCommunityStore = create<CommunityStore>(
  persist<CommunityStore>(
    (set) => ({
      posts: [initialPost],
      addPost: (newPost) => set((state) => {
        const newCommunityPost: CommunityPost = {
          communityPostId: state.posts.length + 1,
          user: {
            userId: newPost.userId,
            nickname: "admin",
            profileImage: UserImage,
          },
          location: {
            locationId: 0,
            locationName: "admin동",
          },
          title: newPost.title,
          content: newPost.content,
          likeCount: 0,
          commentList: [],
          imageList: newPost.images,
          created_at: new Date().toISOString(),
        };

        return { posts: [...state.posts, newCommunityPost] };
      }),
      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.communityPostId !== postId),
      })),
    }),
    {
      name: 'community-posts', 
      storage: localStorage, // 새로운 storage 옵션 사용
    }
  )
);

export default useCommunityStore;

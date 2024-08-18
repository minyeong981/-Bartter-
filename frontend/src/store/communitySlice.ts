// import {format} from 'date-fns';
// import {ko} from 'date-fns/locale';
// import type {StateCreator} from 'zustand';

// import UserImage from '@/assets/image/defaultUser.png';
// import CommunityImage from '@/assets/image/동네모임1.png';

// interface CreatePost {
//   userId: number;
//   title: string;
//   content: string;
//   images: SimpleImage[];
// }

// export interface CommunitySlice {
//   posts: CommunityPostList;
//   addPost: (newPost: CreatePost) => void;
//   deletePost: (postId: number) => void;
//   addComment: (postId:number, newContent:string ) => void;
//   deleteComment: (postId:number, commentId:number) => void;
// }

// const initialPost: CommunityPostList = [
//   {
//     communityPostId: 1,
//     user: {userId: String(0), nickname: 'user0', profileImage: UserImage},
//     location: {locationId: 0, locationName: '광주 장덕동'},
//     title: '게시글 제목',
//     content: '게시글 내용입니다.',
//     isLike:true,
//     likeCount: 12,
//     commentList: [
//       {
//         commentId: 1,
//         user: {userId: '1', nickname: 'user1', profileImage: UserImage},
//         content: '댓글1',
//         created_at: '2024-07-03 12:30',
//       },
//       {
//         commentId: 2,
//         user: {userId: '1', nickname: 'user2', profileImage: UserImage},
//         content: '댓글2',
//         created_at: '2024-07-03 11:26',
//       },
//     ],
//     imageList: [
//       {imageId: 1, imageUrl: CommunityImage, imageOrder: 1},
//       {
//         imageId: 2,
//         imageUrl: CommunityImage,
//         imageOrder: 2,
//       },
//     ],
//     createdAt: '2024-05-20 09:30',
//   },
//   {
//     communityPostId: 2,
//     user: {userId: String(0), nickname: 'user1', profileImage: UserImage},
//     location: {locationId: 1, locationName: '광주 장덕동'},
//     title: '게시글 제목2',
//     content: '게시글 내용입니다2.',
//     isLike:true,
//     likeCount: 12,
//     commentList: [
//       {
//         commentId: 1,
//         user: {userId: '1', nickname: 'user1', profileImage: UserImage},
//         content: '댓글1',
//         created_at: '2024-07-03 12:30',
//       },
//       {
//         commentId: 2,
//         user: {userId: '1', nickname: 'user2', profileImage: UserImage},
//         content: '댓글2',
//         created_at: '2024-07-03 11:26',
//       },
//     ],
//     imageList: [
//       {imageId: 1, imageUrl: CommunityImage, imageOrder: 1},
//       {
//         imageId: 2,
//         imageUrl: CommunityImage,
//         imageOrder: 2,
//       },
//     ],
//     createdAt: '2024-05-31 11:30',
//   },
// ];

// export const createCommunitySlice: StateCreator<
//   CommunitySlice,
//   [],
//   [],
//   CommunitySlice
// > = set => ({
//   posts: [...initialPost],
//   addPost: (newPost: CreatePost) =>
//     set(state => {
//       const newCommunityPost: CommunityPost = {
//         communityPostId: state.posts.length + 1,
//         user: {
//           userId: String(newPost.userId),
//           nickname: 'admin',
//           profileImage: UserImage,
//         },
//         location: {
//           locationId: 0,
//           locationName: 'admin동',
//         },
//         title: newPost.title,
//         content: newPost.content,
//         isLike:true,
//         likeCount: 0,
//         commentList: [],
//         imageList: newPost.images,
//         createdAt: format(new Date(), 'yyyy-MM-dd HH:mm', {locale: ko}),
//       };

//       return {posts: [...state.posts, newCommunityPost]};
//     }),
//   deletePost: (postId: number) =>
//     set(state => ({
//       posts: state.posts.filter(post => post.communityPostId !== postId),
//     })),
//   addComment: (postId:number, newContent:string) => 
//     set(state => ({
//       posts : state.posts.map((post) => {
//         if (post.communityPostId === postId) {
//           const newComment = {
//           commentId: post.commentList.length +1,
//           user: {userId: '1', nickname: 'user1', profileImage: UserImage},
//           content: newContent,
//           created_at: format(new Date(), 'yyyy-MM-dd HH:mm', {locale: ko}),
//           }
//           return {
//             ...post, commentList: [...post.commentList, newComment],
//           };
//         }
//         return post;
//       })
//     })
//     ),
//   deleteComment : (postId:number, commentId:number) => 
//     set(state => ({
//       posts : state.posts.map((post) => {
//         if (post.communityPostId === postId ) {
//           return {
//             ...post, commentList : post.commentList.filter((comment) => comment.commentId !== commentId)
//           };
//         }
//         return post;
//       })
//     })),
// });

// export default createCommunitySlice;
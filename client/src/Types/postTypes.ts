// export type like = {  };
export type commentType = {
  name: string;
  value: string;
};

export type postType = {
  comments: commentType[];
  description: string;
  first_name: string;
  last_name: string;
  likes: string[];
  location: string;
  picturePath: string;
  userId: string;
  userPicturePath: string;
  __v: number;
  _id: string;
};

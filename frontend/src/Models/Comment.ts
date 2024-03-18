export type CommentCreateResponse = {
  title: string;
  content: string;
};

export type CommentGetResponse = {
    title: string;
    content: string;
    createdBy: string;
}

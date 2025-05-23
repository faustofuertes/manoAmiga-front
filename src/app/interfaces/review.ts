export interface Review {
    authorId: string;
    targetId: string;
    postId: string;
    userName: string;
    score: number;
    textReview: string;
    dateAdded: Date;
}

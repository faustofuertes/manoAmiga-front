export interface Review {
    authorId: string | null;
    targetId: string | undefined | null;
    postId: string | undefined;
    userName: string | null;
    score: number;
    textReview: string;
    dateAdded?: Date;
}

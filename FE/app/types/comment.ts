

export interface IComment {
        commentId: string;
        content: string;
        createDate: string;
        customerName: string;
        rating: number;
    }
export interface ICommentReq {
        productId?: string;
        content: string;
        rating: number;
}
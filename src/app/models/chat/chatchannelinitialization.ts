export class ChatChannelInitialization {
    public postId: string;
    public postTitle: string;
    public userIdOne: string;
    public userIdTwo: string;
    constructor(
        postId: string,
        postTitle: string,
        userIdOne: string,
        userIdTwo: string
    ) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.userIdOne = userIdOne;
        this.userIdTwo = userIdTwo;
    }
}
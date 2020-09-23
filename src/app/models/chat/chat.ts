export class Chat {
    public contents: string;
    public fromUserId: string;
    public toUserId: string;
    public timesent: string;
    constructor(
        contents: string,
        fromUserId: string,
        toUserId: string,
        timesent: string
    ) {
        this.contents = contents;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.timesent = timesent;
    }
}

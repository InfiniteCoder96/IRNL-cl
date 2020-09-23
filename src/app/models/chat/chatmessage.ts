export class ChatMessage {
    public sent: string;
    public sentDate: string;
    public received: string;
    public receivedDate: string;
    constructor(
        sent: string,
        sentDate: string,
        received: string,
        receivedDate: string
    ) {
        this.sent = sent;
        this.sentDate = sentDate;
        this.received = received;
        this.receivedDate = receivedDate;
    }
}
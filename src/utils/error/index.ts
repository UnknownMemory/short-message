export class RequestError extends Error {
    public status?: number

    constructor(message: string, status: number){
        super(message)
        this.name = "RequestError"
        this.status = status
    }
}



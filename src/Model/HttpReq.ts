
export class HttpReq {
    requestUrl: string = "http://localhost:2828/"

    getRequestUrl(url: string) {
        return this.requestUrl + url;
    }
}

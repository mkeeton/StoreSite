export class OrderItem {
    constructor(public Id: string,
        ItemReference: string,
        ItemDescription: string,
        ItemPrice: number,
        Tax: number,
        Qty: number,
        TotalPrice) { }
}
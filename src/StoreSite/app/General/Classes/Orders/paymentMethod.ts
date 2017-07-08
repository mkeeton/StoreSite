export class PaymentMethod {
    constructor(public Id: string,
        MethodName: string,
        PaymentURL: string,
        HasReference: boolean) { }
}
import { Address } from "./address";
import { OrderItem } from "./orderItem";
import { PaymentMethod } from "./paymentMethod";

export class Order {
    constructor(public Id: string,
        public ClientId: string,
        public CreatedDate: Date,
        public OrderedBy: string,
        public BillingAddress: Address,
        public HasDelivery: Boolean,
        public BillingAddressAsDelivery: Boolean,
        public DeliveryAddress: Address,
        public Currency: string,
        public CustomerEmail: string,
        public Items: OrderItem[],
        public PaymentMethod: PaymentMethod,
        public PaymentReference: string) { }

}
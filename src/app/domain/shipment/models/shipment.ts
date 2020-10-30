export interface Shipment {
    trackingNumber: string;
    from: {
        city: string;
        Address: string;
    };
    to: {
        city: string;
        Address: string;
    };
    cashOnDelivery: number;
    eta: string;
}

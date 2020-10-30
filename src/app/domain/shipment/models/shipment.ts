export interface Shipment {
    trackingNumber: string;
    from: {
        city: string;
    };
    to: {
        city: string;
    };
    cashOnDelivery: number;
    eta: string;
}

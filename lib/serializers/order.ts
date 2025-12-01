export interface OrderItemProps {
    id: string;              // unique id for rendering
    title: string;           // product title
    variantTitle: string | null;
    quantity: number;
    price: string;           // formatted string: "£29.00"
    imageUrl: string | null;
    currency: string;        // "GBP", "EUR"
  }
  
  export interface OrderCardProps {
    id: string;
    number: number;          // orderNumber
    name: string;            // order "name" (#1001)
    processedAt: string;     // formatted date "12 Jan 2024"
    total: string;           // formatted total price
    currency: string;        // currency code
  
    fulfillmentStatus: string;
    financialStatus: string;
  
    statusUrl: string | null;
  
    items: OrderItemProps[];
  }
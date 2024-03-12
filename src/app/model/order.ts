
export interface OrderDto {
    id:number|null,
    Id_customer: number,
    status: boolean,
    address:string,
    Price:number,
    Order_details:Order_detailsDto[]
}


export interface Order_detailsDto {
    id:number|null,
    Id_Order: number| null,
    Id_product: number| null,
    Quantity: number,
    Price: number
}
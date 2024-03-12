export interface exportbillDto {
    id: number | null,
    Id_customer: number,
    Price: number,
    Detail_exportbills: Detail_exportbillsDto[]
}

export interface Detail_exportbillsDto {
    id: number | null,
    IdExportbill: number,
    Idproduct: number,
    Price: number,
    Idwarehouse:number,
    Quantity: number,
}
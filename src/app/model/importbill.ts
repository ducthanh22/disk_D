export interface importbillDto {
    id: number | null,
    Id_customer: number,
    Price: number,
    Detail_importbills: Detail_importbillsDto[]
}

export interface Detail_importbillsDto {
    id: number | null,
    IdImportbillId: number ,
    Idproduct: number,
    Price: number,
    Quantity: number,
}
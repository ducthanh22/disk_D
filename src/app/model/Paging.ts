export interface Paging {
    pageIndex: number;
    pageSize: number;
    keyword: string | null;
    orderBy: string | null;
}
export interface BaseQuerieResponse<T> {
    count: number;
    page: number;
    pageSize: number;
    // keyword: string | null;
    // keynumber: number | null;
    rows: T[];
}
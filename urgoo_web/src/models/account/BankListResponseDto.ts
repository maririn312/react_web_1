export interface BankListResponseDto {
    msg:    string;
    status: number;
    banks:  BankDto[];
}

export interface BankDto {
    id:    number;
    code:  string;
    name:  string;
    bifci: string;
}

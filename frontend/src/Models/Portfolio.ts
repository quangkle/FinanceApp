export type PortfolioGetResponse = {
    id: number;
    symbol: string;
    companyName: string;
    purchase: number;
    lastDiv: number;
    industry: string;
    marketCap: number;
    comments: any;
}

export type PortfolioCreateResponse = {
    symbol: string;
}

export type PortfolioDeleteResponse = {
    symbol: string;
}
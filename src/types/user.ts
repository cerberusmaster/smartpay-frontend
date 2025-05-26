export type User = {
    id: string;
    email: string;
    phone: string;
    wallet: Wallet;
};


export type Wallet = {
    id: string,
    user_id: string,
    balance: number
}

export type Transaction = {
    id: string,
    type: "top-up" | "transfer",
    sender_id: string,
    receiver_id: string,
    timestamp: string,
    status: string
}
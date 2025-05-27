export type Role = 'admin' | 'guest' | 'user';
export type User = {
    id: string;
    email: string;
    phone: string;
    role: Role;
    is_verified?: boolean;
    wallet?: Wallet;
};

export type LoginData = {
    email: string,
    password: string
}

export type LoginResponse = {
    access_token: string,
    token_type: "bearer"
}

export type Wallet = {
    id: string,
    user_id: string,
    balance: number,
    user?: {
        id: string,
        email: string
    }
}

export type Transaction = {
    id: string,
    type: "top-up" | "transfer",
    sender_id: string,
    receiver_id: string,
    timestamp: string,
    status: string
}
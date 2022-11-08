export type Menu = {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    imgUrl: string;
    quantity: number;
    id: number;
}

export type User = {
    username: string;
    password: string;
    orders: Orders[];
    customer: boolean;
    id: number;
}

export type Orders = {
    date: string;
    items: Menu[];
    orderId: number;
    status: string;
    userComment: string;
    adminComment: string;
    id: number;
}

export type Credentials = {
    username: string;
    password: string;
}

export type Schema = {
    menu: Menu[];
    users: User[];
    order: Orders[];    
}
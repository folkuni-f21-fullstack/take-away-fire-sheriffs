export type Menu = {
    title: string;
    price: number;
    ingredients: string;
    allergies: string;
    imgUrl: string;
    id: number;
}

export type Users = {
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

export type Schema = {
    menu: Menu[];
    users: Users[];
    // Lägg till mer data eftersom
    //users: User[]; exempel på så det skulle kunna se ut för oss!!
    //menu: Menu[]; exempel på så det skulle kunna se ut för oss!!
}
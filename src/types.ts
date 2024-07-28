export type User = {
    id: {
        name: string,
        value: string
    }
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
        medium: string;
    };
};

export type UsersState = {
    usersData: User[];
    loading: boolean;
    error: string | null;
}
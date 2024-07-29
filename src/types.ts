export type User = {
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
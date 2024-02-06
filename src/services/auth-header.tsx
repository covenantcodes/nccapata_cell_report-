interface User {
    accessToken: string;
}

export default function authHeader(): { [key: string]: string } {
    const userString: string | null = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}

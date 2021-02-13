export const requestPostHandler = async (string, data) => {
    let request = await fetch(`http://localhost:8080${string}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    request = await request.json();

    return request;
};

export const requestGetHandler = async (string) => {
    let request = await fetch(`http://localhost:8080${string}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    request = await request.json();

    return request;
};

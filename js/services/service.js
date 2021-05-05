const getResources = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await response.json();
};


export {getResources, postData} ;
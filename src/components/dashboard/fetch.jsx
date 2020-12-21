var encoded;
export const createEncoded = (username, passwd) => {
    encoded = window.btoa(username + ":" + passwd);
}

export const getEncoded = () =>{
    return encoded;
}
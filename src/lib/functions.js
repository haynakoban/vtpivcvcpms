const generateRandomId = () => {
    const now = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    const randomExtra = Math.random().toString(36).substr(2, 9);
    return `${now}-${random}-${randomExtra}`;
}

export {
    generateRandomId
}
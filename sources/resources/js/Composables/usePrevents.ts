export function allowAlphabets(e) {
    if (!/[A-Za-z ]/.test(e.key.toString())) {
        e.preventDefault();
        return false;
    }
    return true;
}

export function allowNumbers(e) {
    if (!/[0-9]/.test(e.key.toString())) {
        e.preventDefault();
        return false;
    }
    return true;
}

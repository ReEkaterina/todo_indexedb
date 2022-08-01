export function dateFormat(date) {

    if (!date) {
        return '';
    }

    try {
        return `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`;
    } catch (error) {
        return date;
    }

}
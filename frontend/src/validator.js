// Just a simple token logic, because I put the project on public, it's not that strong security way of hiding token but it helps a little.
function validate_token(token) {
    const params = new URL(document.location);
    if (
        params.searchParams.get("simpleToken") &&
        params.searchParams.get("simpleToken") ===
        token
    ) {
        return true;
    } else {
        return false;
    }
}

let notAllowedMessage = "You don't have a token to do this action."

export default {
    validate_token,
    notAllowedMessage
}
// Validate if inputs are empty.
function not_empty(data, property, color, message, input_id, error_wrapper_id) {

    if (!data.hasOwnProperty(property)) {
        document.getElementById(input_id).style.borderColor = color;
        document.getElementById(error_wrapper_id).innerHTML =
            message;
        return false;
    }

    if (data.hasOwnProperty(property)) {
        if (data[property].length === 0) {
            document.getElementById(input_id).style.borderColor = color;
            document.getElementById(error_wrapper_id).innerHTML =
                message;
            return false;
        }
    }
    return true;
}

function error_message(data, color, input_id, error_wrapper_id) {
    if (input_id != null) {
        document.getElementById(input_id).style.borderColor = color;
    }
    document.getElementById(error_wrapper_id).innerHTML = data.data.message
}

function get_token() {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('simpleToken')
    return token
}

export default {
    get_token,
    error_message,
    not_empty
}
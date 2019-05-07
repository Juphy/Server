let success = (data, msg = '', attr = '') => {
    return {
        result: data,
        msg: msg,
        status: 200
    }
}

let failed = (msg = '', attr = '') => {
    return {
        result: null,
        msg: msg,
        status: 400
    }
}

module.exports = {
    success,
    failed
}
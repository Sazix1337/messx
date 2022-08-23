class VarError {
    message
    constructor(message) {
        this.message = message;
        return message;
    }
}

module.exports = VarError
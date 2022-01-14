export class MessageTransmission {
    /**
     * Create a new message transmission object to store the state of a message broadcast
     * @param {string} message
     * @param {number} range
     * @param {number} interference
     */
    constructor(message, range) {
        this.message = message;
        this.scaling = range * Math.random();
        this._encode();
        this.numTransmissions = 0;
    }

    /**
     * Convert the given message into a series of 0s and 1s to broadcast a signal
     * @private
     */
    _encode() {
        this.encoding = [];
        for (let i = 0; i < this.message.length; i++) {
            this.encoding.push(...this.message.charCodeAt(i).toString(2).padStart(16, "0"));
        }
    }

    /**
     * Get the true value of the next signal to broadcast
     * @returns {number}
     */
    nextSignal() {
        return this.encoding[this.numTransmissions++] === "1" ? 1 : 0;
    }

    nextSignalNoisy(interference) {
        const signal = this.nextSignal();
        if (signal === 0) {
            return this.emptyNoise(interference);
        } else {
            return (1 - interference * Math.random()) * this.scaling;
        }
    }

    emptyNoise(interference) {
        return (0.6 + interference * Math.random()) * this.scaling;
    }

    transmissionOver() {
        return this.numTransmissions >= this.message.length * 16;
    }

    retransmit() {
        this.numTransmissions = 0;
    }
}
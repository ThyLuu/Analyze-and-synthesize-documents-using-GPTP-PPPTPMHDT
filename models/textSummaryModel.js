const mongoose = require('mongoose');

const textSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Liên kết với mô hình User
    },
    originalText: {
        type: String,
        required: true
    },
    summaryText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

textSummarySchema.statics.createSummary = async function (data) {
    return await this.create(data);
};

textSummarySchema.statics.getSummaryById = async function (id) {
    return await this.findById(id);
};

textSummarySchema.statics.updateSummary = async function (id, data) {
    return await this.findByIdAndUpdate(id, data, { new: true });
};

textSummarySchema.statics.deleteSummary = async function (id) {
    return await this.findByIdAndDelete(id);
};

const TextSummary = mongoose.model('TextSummary', textSummarySchema);

module.exports = TextSummary;

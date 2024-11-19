const mongoose = require('mongoose');

const textGenerateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Liên kết với mô hình User
    },
    generatedText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// CRUD methods
textGenerateSchema.statics.createGeneratedText = async function (data) {
    return await this.create(data);
};

textGenerateSchema.statics.getGeneratedTextById = async function (id) {
    return await this.findById(id);
};

textGenerateSchema.statics.updateGeneratedText = async function (id, data) {
    return await this.findByIdAndUpdate(id, data, { new: true });
};

textGenerateSchema.statics.deleteGeneratedText = async function (id) {
    return await this.findByIdAndDelete(id);
};

const TextGenerate = mongoose.model('TextGenerate', textGenerateSchema);

module.exports = TextGenerate;

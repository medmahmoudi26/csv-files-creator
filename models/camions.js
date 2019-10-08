const mongoose = require("mongoose");

var camionSchema = mongoose.Schema({
    
});

var Camions = mongoose.model('Camions', camionSchema);

module.exports = Camions;
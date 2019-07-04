const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    employeeID: String,
    department: String,
    costCenter: String,
    position: String,
    site: String,
    country: String,
    supervisorID: String,
    firstName: String,
    secondName: String,
    lastName: String,
    email: String,
    isSupervisor: { type: Number, default: 0 },
    status: { type: Number, default:1 },
    costCenterID: { type: String, default:"CC-999-VOXP" }
});

mongoose.model('employees', employeeSchema);

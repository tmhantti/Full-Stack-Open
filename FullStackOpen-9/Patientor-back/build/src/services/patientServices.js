"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const findById = (id) => {
    const entry = patients_1.default.find(d => d.id === id);
    return entry;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: String(uuid_1.v4) }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    findById,
    addPatient
};

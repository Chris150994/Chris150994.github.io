"use strict";

let vehicles = [];
let checkedInVehicles = [];

function checkIn(reg) {
    let index;
    let finalString;

    vehicles.forEach(function (element) {
        if (reg === element["reg"]) {
            index = vehicles.indexOf(element);
            checkedInVehicles.push(element);
        }
    }, this);

    if (index > -1) {
        vehicles.splice(index, 1);
        finalString = "Vehicle with reg: " + reg + " checked in.";
    }

    return finalString;
}

function checkOut(reg) {
    let index;
    let finalString;

    checkedInVehicles.forEach(function (element) {
        if (reg === element["reg"]) {
            index = checkedInVehicles.indexOf(element);
            vehicles.push(element);
        }
    }, this);

    if (index > -1) {
        checkedInVehicles.splice(index, 1);
        finalString = "Vehicle with reg: " + reg + " checked out.";
    }

    return finalString;
}

function outputCheckedInVehiclesContents() {
    let final = "Checked in vehicles:\n";
    checkedInVehicles.forEach(function (vehicle) {
        final = final + vehicle["type"] + " " + vehicle["reg"] + " " + vehicle["make"] + " " + vehicle["faults"] + "\n";
    }, this);
    return final;
}

function outputVehiclesContents() {
    let final = "Vehicles\n";
    vehicles.forEach(function (vehicle) {
        final = final + vehicle["type"] + " " + vehicle["reg"] + " " + vehicle["make"] + " " + vehicle["faults"] + "\n";
    }, this);
    return final;
}

function calculateBill(reg) {
    let type;
    checkedInVehicles.forEach(function (element) {
        if (reg === element["reg"]) {
            type = element["type"];
        }
    }, this);

    if (type === "Car") {
        alert("200");
    }
    else if (type === "Motorbike") {
        alert("100");
    }
    else {
        alert("Not Recognised")
    }
}

function createVehicle(type, make, reg, faults) {
    let faultsTemp;
    if (faults === "") {
        faultsTemp = "N/A";
    }
    else {
        faultsTemp = faults;
    }
    let vehicle = {
        type: type,
        make: make,
        reg: reg,
        faults: faultsTemp,
    }
    vehicles.push(vehicle);
    return vehicle;
}
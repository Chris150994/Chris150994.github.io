"use strict";

let vehicles = [];
let checkedInVehicles = [];

function checkIn() {
    let index;

    vehicles.forEach(function (element) {
        if (document.getElementById("reg").value === element["reg"]) {
            index = vehicles.indexOf(element);
            checkedInVehicles.push(element);
        }
    }, this);

    if (index > -1) {
        vehicles.splice(index, 1);
    }

    clearLists();
    outputVehiclesContents();
    outputCheckedInVehiclesContents();
}

function checkOut() {
    let index;

    checkedInVehicles.forEach(function (element) {
        if (document.getElementById("reg").value === element["reg"]) {
            index = checkedInVehicles.indexOf(element);
            console.log(index);
            vehicles.push(element);
        }
    }, this);

    if (index > -1) {
        checkedInVehicles.splice(index, 1);
    }

    clearLists();
    outputVehiclesContents();
    outputCheckedInVehiclesContents();
}

function clearLists() {
    document.getElementById("vehicleList").options.length = 0;
    document.getElementById("checkedInList").options.length = 0;
    console.log("Lists Cleared");
}

function updateVehiclesTextBoxes() {
    let full = document.getElementById("vehicleList").value;
    let res = full.toString().split(" ");
    let faults = "";

    if (res.length > 4) {
        for (let i = 3; i < res.length; i++) {
            faults += res[i] + " ";
        }
    }
    else {
        faults = res[3]
    }

    document.getElementById("vehicleType").value = res[0];
    document.getElementById("make").value = res[1];
    document.getElementById("reg").value = res[2];
    document.getElementById("faults").value = faults;
}

function updateCheckedInTextBoxes() {
    let full = document.getElementById("checkedInList").value;
    let res = full.toString().split(" ");
    let faults = "";

    if (res.length > 4) {
        for (let i = 3; i < res.length; i++) {
            faults += res[i] + " ";
        }
    }
    else {
        faults = res[3]
    }

    document.getElementById("vehicleType").value = res[0];
    document.getElementById("make").value = res[1];
    document.getElementById("reg").value = res[2];
    document.getElementById("faults").value = faults;
}

function outputCheckedInVehiclesContents() {
    let x = document.getElementById("checkedInList");

    while (x.hasChildNodes()) {
        x.removeChild(x.lastChild);
    }

    checkedInVehicles.forEach(function (element) {
        let option = document.createElement("option");
        let fullReference = (element["type"] + " " + element["make"] + " " + element["reg"] + " " + element["faults"]);
        option.text = fullReference;
        x.add(option);
    }, this);
}

function outputVehiclesContents() {
    let x = document.getElementById("vehicleList");

    while (x.hasChildNodes()) {
        x.removeChild(x.lastChild);
    }

    vehicles.forEach(function (element) {
        let option = document.createElement("option");
        let fullReference = (element["type"] + " " + element["make"] + " " + element["reg"] + " " + element["faults"]);
        option.text = fullReference;
        x.add(option);
    }, this);
}

function calculateBill() {
    if (document.getElementById("vehicleType").value === "Car") {
        alert("200");
    }
    else if (document.getElementById("vehicleType").value === "Motorbike") {
        alert("100");
    }
    else {
        alert("Not Recognised")
    }
}

function createVehicle() {
    let faultsTemp;
    if (document.getElementById("faults").value === "") {
        faultsTemp = "N/A"
    }
    else {
        faultsTemp = document.getElementById("faults")
    }
    let vehicle = {
        type: document.getElementById("vehicleType").value,
        make: document.getElementById("make").value,
        reg: document.getElementById("reg").value.toUpperCase(),
        faults: faultsTemp,
    }
    vehicles.push(vehicle);
    outputVehiclesContents();
    console.log(vehicle);
}
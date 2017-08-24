function sendCommand(text) {
    let commands = text.split(" ");
    let fault = ""
    if (text != "") {
        switch (commands[0].toLowerCase()) {
            case "help":
                help();
                break;
            case "create":
                if (commands.length === 4) {
                    fault = "N/A"
                }
                else {
                    for (let i = 4; i < commands.length; i++) {
                        fault = fault + commands[i] + " ";
                    }
                }
                create(commands[1], commands[2], commands[3], commands[4])

                break;
            case "output":
                output(commands[1]);
                break;
            case "check-in":
                updateWith(checkIn(commands[1]));
                break;
            case "check-out":
                updateWith(checkOut(commands[1]));
                break;
            case "bill":
                updateWith(calculateBill(commands[1]));
                break;
            case "clear":
                document.getElementById("text").value = "";
                break;
            default:
                break;
        }
        clearTextBox();
    }

}

function updateWith(update) {
    document.getElementById("text").value = update + "\n" + document.getElementById("text").value;
}

function help() {
    updateWith(
        "\nTo create vehicles: \n" + "create (type) (make) (registration) (faults)" +
        "\nTo output vehicles: \n" + "output vehicles" +
        "\nTo output vehicles in garage: \n" + "output garage" +
        "\nTo check in a vehicle: \n" + "check-in (reg)" +
        "\nTo check out a vehicle: \n" + "check-out (reg)" +
        "\nTo clear the console log: " + "clear");
}

function create(command1, command2, command3, command4) {
    if (command1 != null && command2 != null && command3 != null) {
        createVehicle(command1, command2, command3, command4);
        updateWith(command2 + " " + command3 + " - Added \n");
    }
    else (
        updateWith("Vehicle not created, parameter(s) missing.")
    )
}

function output(command) {
    if (command === "vehicles" && vehicles.length != 0) {
        updateWith(outputVehiclesContents());
    }
    else if (command === "garage" && checkedInVehicles.length != 0) {
        updateWith(outputCheckedInVehiclesContents());
    }
    else if (vehicles.length === 0) {
        updateWith("No vehicles registered.");
    }
    else if (checkedInVehicles.length === 0) {
        updateWith("No vehicles registered.");
    }
    else (
        updateWith("Invalid specifier. Use either 'vehicles' or 'garage' after output.")
    )
}

function clearTextBox() {
    document.getElementById("command").value = "";
}
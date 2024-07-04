// Your code here
function createEmployeeRecord(arr) {
    const [firstName, familyName, title, payPerHour] = arr

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr))
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100; // Assuming hours are stored as 24-hour format (e.g., 0900 for 9:00 AM)
    } else {
        return 0;
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
    return totalPayroll;
}
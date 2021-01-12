function checkInfection(contactDate, currentDate, incubationPeriod, dayWeInfect) {
    if (Math.abs((currentDate - contactDate)/(1000 * 3600 * 24)) > incubationPeriod + dayWeInfect) {
        return String(false);
    }
    else {
        return String(true);
    }
}

function checkQuarantine(contactDate, symptomsDate, testDate, currentDate, incubationPeriod, dayWeInfect, quarantineTime) {
    let quarantine;
    if (Math.abs((testDate - contactDate)/(1000 * 3600 * 24)) <= 3) {
        if (Math.abs((symptomsDate - contactDate)/(1000 * 3600 * 24)) > incubationPeriod + dayWeInfect) {
            quarantine = 0;
        }
        else {
            quarantine = quarantineTime-(Math.abs((currentDate-contactDate)/(1000 * 3600 * 24)));
        }
    }
    else {
        quarantine = quarantineTime-(Math.abs((currentDate-contactDate)/(1000 * 3600 * 24)));
    }
    let dayOfQuarantine = new Date(currentDate + (quarantine * 1000 * 3600 * 24));
    let dd = String(dayOfQuarantine.getDate()).padStart(2, '0');
    let mm = String(dayOfQuarantine.getMonth() + 1).padStart(2, '0');
    let yyyy = dayOfQuarantine.getFullYear();
    return String(yyyy + '-' + mm + '-' + dd);
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getDate(msg) {
    let date = prompt(msg + " (yyyy-mm-dd)");
    return date;
}

function getAdditionalData(msg) {
    let addData = prompt(msg);
    return addData;
}

function getInputValue(){
    let person = {
        contactDate: document.getElementById("contactDate").value,
        symptomsDate: document.getElementById("symptomsDate").value,
        testDate: document.getElementById("testDate").value,
        currentDate: getCurrentDate()
    };
    return person;
}

document.getElementById("contactDate").max = getCurrentDate();
document.getElementById("symptomsDate").max = getCurrentDate();
document.getElementById("testDate").max = getCurrentDate();

var report;

function check_btn_clicked() {
    if (document.getElementById('contactDate').validity.valid && document.getElementById('symptomsDate').validity.valid && document.getElementById('testDate').validity.valid && document.getElementById('incubationPeriod').validity.valid && document.getElementById('dayWeInfect').validity.valid && document.getElementById('quarantineTime').validity.valid) {
        if (report != undefined)
        {
            var person = getInputValue();
            person.isInfected = checkInfection(Date.parse(person.contactDate), Date.parse(person.currentDate), document.getElementById("incubationPeriod").value, document.getElementById("dayWeInfect").value);
            person.needsQuarantine = checkQuarantine(Date.parse(person.contactDate), Date.parse(person.symptomsDate), Date.parse(person.testDate), Date.parse(person.currentDate), document.getElementById("incubationPeriod").value, document.getElementById("dayWeInfect").value, document.getElementById("quarantineTime").value);
            report.push(person);
            document.getElementById("result").innerHTML = person.isInfected + ', ' + person.needsQuarantine;
        }
        else
        {
            report = new Array(1);
            report[0] = person = {contactDate: "Contact Date", symptomsDate: "Symptoms date", testDate: "Test date", currentDate: "Current date", isInfected: "Infected", needsQuarantine: "Last day of quarantine"};
            var person = getInputValue();
            person.isInfected = checkInfection(Date.parse(person.contactDate), Date.parse(person.currentDate), document.getElementById("incubationPeriod").value, document.getElementById("dayWeInfect").value);
            person.needsQuarantine = checkQuarantine(Date.parse(person.contactDate), Date.parse(person.symptomsDate), Date.parse(person.testDate), Date.parse(person.currentDate), document.getElementById("incubationPeriod").value, document.getElementById("dayWeInfect").value, document.getElementById("quarantineTime").value);
            report.push(person);
            document.getElementById("reportButton").disabled = false;
            document.getElementById("result").innerHTML = person.isInfected + ', ' + person.needsQuarantine;
        }
    }
}

function report_btn_clicked() {
    localStorage.setItem('report-data', JSON.stringify(report));
    window.location.href="./report.html";
}

function formSubmission(e) {
    return false;
}

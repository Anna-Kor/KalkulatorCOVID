function createTable() {
  var report = JSON.parse(localStorage.getItem('report-data'));
  var body = document.getElementsByTagName("body")[0];

  var table = document.createElement("table");
  table.setAttribute("class", "reportTable");
  var tableBody = document.createElement("tbody");

  for (var i = 0; i < report.length; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 6; j++) {
      var cell = document.createElement("td");
      var cellContent;
      if (j == 0) {
        cellContent = document.createTextNode(report[i].contactDate);
      }
      else if (j == 1) {
        cellContent = document.createTextNode(report[i].symptomsDate);
      }
      else if (j == 2) {
        cellContent = document.createTextNode(report[i].testDate);
      }
      else if (j == 3) {
        cellContent = document.createTextNode(report[i].currentDate);
      }
      else if (j == 4) {
        cellContent = document.createTextNode(report[i].isInfected);
      }
      else {
        cellContent = document.createTextNode(report[i].needsQuarantine);
      }
      cell.appendChild(cellContent);
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  body.appendChild(table);
  table.setAttribute("border", "2");
}

createTable();
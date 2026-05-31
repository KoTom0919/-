const tableBody = document.getElementById("tableBody");

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

let selectedCell = null;

function createTable(month) {

    tableBody.innerHTML = "";

    for (let day = 1; day <= 31; day++) {

        const date = new Date(2026, month, day);

        if (date.getMonth() !== month) {
            break;
        }

        const weekday = weekdays[date.getDay()];

        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${day}</td>
      <td>${weekday}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>

      <td>
        <select>
          <option value=""></option>
          <option value="〇">〇</option>
          <option value="△">△</option>
          <option value="✕">✕</option>
        </select>
      </td>

      <td>
        <select>
        <option value=""></option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
        <option value="0">0</option>
        <option value="-1">-1</option>
        <option value="-2">-2</option>
        <option value="-3">-3</option>
        </select>
        </td>
    <td>
    <select>
        <option value=""></option>
        <option value="〇">〇</option>
        <option value="△">△</option>
          <option value="✕">✕</option>
    </select>
      </td>
    <td>
      <select>
        <option value=""></option>
        <option value="〇">〇</option>
        <option value="△">△</option>
          <option value="✕">✕</option>
    </select>
    </td>
    <td>
      <select>
        <option value=""></option>
        <option value="〇">〇</option>
        <option value="△">△</option>
          <option value="✕">✕</option>
    </select>
    </td>
    <td>  <select>
        <option value=""></option>
        <option value="〇">〇</option>
        <option value="△">△</option>
          <option value="✕">✕</option>
    </select>
    </td>
    <td>
      <select>
        <option value=""></option>
        <option value="〇">〇</option>
        <option value="△">△</option>
          <option value="✕">✕</option>
    </select>
    </td>
            
    `;

        tableBody.appendChild(row);
    }

    setupCells();
}

function setupCells() {

    const cells =
        document.querySelectorAll("#timeTable tr td:nth-child(n+3)");

    cells.forEach(cell => {

        if (cell.querySelector("select")) {
            return;
        }

        cell.addEventListener("pointerdown", function () {

            selectedCell = cell;

            cells.forEach(c => {
                c.style.backgroundColor = "";
            });

            cell.style.backgroundColor = "lightblue";
        });
    });
}

function setTimeToCell(timeText) {

    if (selectedCell === null) {
        return;
    }

    selectedCell.textContent = timeText;
}

function recordTime() {

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2, "0")
        + ":"
        + now.getMinutes().toString().padStart(2, "0");

    setTimeToCell(time);
}

function addManualTime() {

    const input = document.getElementById("manualTime");

    if (input.value !== "") {
        setTimeToCell(input.value);
    }
}

function clearTimes() {

    const cells =
        document.querySelectorAll("#timeTable td");

    cells.forEach(cell => {

        if (!cell.querySelector("select")) {
            cell.textContent = "";
        }

        cell.style.backgroundColor = "";
    });

    selectedCell = null;

    createTable(
        Number(document.getElementById("monthSelect").value)
    );
}

function changeMonth() {

    const month =
        Number(document.getElementById("monthSelect").value);

    createTable(month);
}

document.addEventListener("keydown", function (event) {

    if (selectedCell === null) {
        return;
    }

    if (event.key === "Backspace" || event.key === "Delete") {

        event.preventDefault();

        selectedCell.textContent = "";
    }
});

createTable(4);

function savePDF() {

  window.print();

}
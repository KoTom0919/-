const tableBody = document.getElementById("tableBody");

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

let selectedCell = null;

let currentMonth = 4;

function saveData() {
    localStorage.setItem(
        "sleepRecord",
        document.getElementById("tableBody").innerHTML
    );
}



function loadData() {

    const savedData =
        localStorage.getItem("sleepRecord");

    if (savedData) {
        tableBody.innerHTML = savedData;
        setupCells();
    }
}



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
    <td contenteditable="true" class="memo-cell"></td>
            
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

    // 既に値が入っていたら変更しない
    if (selectedCell.textContent.trim() !== "") {

        alert("入力済みです。\n変更する場合は「このデータを消す」を押してください。");

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
    saveData();
}

function addManualTime() {

    const input = document.getElementById("manualTime");

    if (input.value !== "") {
        setTimeToCell(input.value);
    }
    saveData();
}

function clearTimes() {

    const result = confirm("すべて消去しますか？");

    if (!result) {
        return;
    }

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
    localStorage.removeItem("sleepRecord");
}

function changeMonth() {

    const select =
        document.getElementById("monthSelect");

    const newMonth =
        Number(select.value);

    const result = confirm(
        "データが消去されます\n月を変更しますか？"
    );

    if (!result) {

        select.value = currentMonth;

        return;
    }

    currentMonth = newMonth;

    createTable(newMonth);
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
loadData();

function savePDF() {

  window.print();

}
function clearSelectedCell() {

    if (selectedCell === null) {
        return;
    }

    selectedCell.textContent = "";
}
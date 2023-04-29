const inputs = document.querySelectorAll("input");

document.getElementById("solve").addEventListener("click", solve);

function solve() {
  const string1 = inputs[0].value;
  const string2 = inputs[1].value;
  const string3 = inputs[2].value;

  const nodeList = solvePuzzle(string1, string2, string3);
  if (!nodeList) {
    document.getElementById("table").innerHTML = "No Solution";
    return;
  }
  document.getElementById("table").innerHTML = createAnwerTable(nodeList);
}

const createAnwerTable = (nodeList) => {
  return `
  <table border="1" class="table">
      <thead>
        <th>Char</th>
        <th>Value</th>
      </thead>
      <tbody>
        ${nodeList.map((node) => createRow(node)).join("")}
      </tbody>
    </table>
  `;
};

const createRow = (node) => {
  return `
  <tr>
    <td>${node.letter}</td>
    <td>${node.value}</td>
  </tr>
  `;
};

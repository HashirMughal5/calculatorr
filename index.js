let history = [];
function dis(val) {
  document.getElementById("result").value += val;
}
function clr() {
  document.getElementById("result").value = "";
}
function keyWrite(event) {
  var keyChar = event.key;
  var alphanumeric = /[a-zA-Z0-9+*/.^()-]/;

  if (keyChar.length === 1 && alphanumeric.test(keyChar)) {
    document.getElementById("result").value += event.key;
  }
}

function divByZero(exp) {
  const searchTerm = "/";
  let index = 0;

  while (exp.indexOf(searchTerm, index) !== -1) {
    let indexOfFirst = exp.indexOf(searchTerm, index);

    index = indexOfFirst + 1;
    if (exp[index] == "0" && isNaN(exp[index + 1])) {
      return true;
    }
  }
}
let scope = {};
function solve() {
  let exp = document.getElementById("result").value;
  if (divByZero(exp)) {
    let obj = {};

    document.getElementById("screen").innerHTML =
      "Divison by zero not possible";
    obj[`${exp}`] = "Divison by zero not possible";
    history.push(obj);

    return;
  }

  let duplicateExp = document.getElementById("result").value;
  //try catch exception
  try {
    let obj = {};

    const node2 = math.parse(exp);
    const code2 = node2.compile();
    console.log(code2);
    exp = code2.evaluate(scope);
    document.getElementById("screen").innerHTML = exp.toFixed(4);
    obj[`${duplicateExp}`] = exp;

    history.push(obj);
  } catch (error) {
    let obj = {};
    document.getElementById("screen").innerHTML = error;
    if (error == Infinity || error == -Infinity) {
      if (divByZero(exp)) {
        let obj = {};

        document.getElementById("screen").innerHTML =
          "Divison by zero not possible";
        obj[`${exp}`] = "Divison by zero not possible";
        history.push(obj);

        return;
      }
    }

    obj[`${duplicateExp}`] = error;
    history.push(obj);
  }
}
// evaluate

var exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // event.preventDefault();

  var recipient = button.getAttribute("data-bs-whatever");
});

function addVariable() {
  let variable = document.getElementById("var-name").value;
  let variableValue = document.getElementById("var-val").value;
  if (variable) {
    if (variable !== "pi" && variable !== "e") {
      if (variableValue) {
        let value = Number(variableValue);
        if (value) {
          scope[variable] = value;
          alert("variable added");
        } else {
          alert("variable can contain numeric values");
        }
      } else {
        alert("variable should have value ");
      }
    } else {
      alert("variable name can not be pi and e");
    }
  } else {
    alert("Variable name can not be empty");
  }
}

function showHistory() {
  let table = document.getElementById("history-table");
  table.innerHTML = "";
  // alert(table)
  history.forEach((value, index) => {
    const row = document.createElement("tr");

    const expression = document.createElement("td");
    const result = document.createElement("td");
    const btn = document.createElement("td");

    const deletBtn = document.createElement("button");
    deletBtn.classList.add("btn");
    deletBtn.classList.add("btn-danger");
    const deleteTxtNode = document.createTextNode("delete");
    deletBtn.appendChild(deleteTxtNode);
    const key = Object.keys(value)[0];
    const textNodeForExpr = document.createTextNode(key);
    expression.appendChild(textNodeForExpr);
    const txtResult = value[key];
    const textNodeForResult = document.createTextNode(txtResult);
    result.appendChild(textNodeForResult);
    btn.appendChild(deletBtn);
    expression.setAttribute("data-bs-dismiss", "modal");
    expression.addEventListener("click", function (event) {
      document.getElementById("result").value = key;
    });
    deletBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      history.splice(index, 1);
      showHistory();
    });

    row.appendChild(expression);
    row.appendChild(result);
    row.appendChild(btn);

    table.appendChild(row);
  });
}

//* ----------- Selectors -----------------*//

const addBtn = document.getElementById("addBtn");
const income = document.getElementById("income");
const addForm = document.getElementById("addForm");
const saveBtn = document.getElementById("saveBtn");
const expenseForm = document.getElementById("expenseForm");
const resultIncome = document.getElementById("resultIncome");
const resultExpense = document.getElementById("resultExpense");
const resultBalance = document.getElementById("resultBalance");
const expenseAmountInput = document.getElementById("expenseAmount");
const dateInput = document.getElementById("date");
const expenseDetailInput = document.getElementById("expenseDetail");
const amountInput = document.getElementById("expenseAmount");
const tbody = document.getElementById("expense-row");
const clearBtn=document.getElementById("clearBtn")

//* ----------- Variables -----------------*//

let incomeTotal = 0;
let detailArr = [];

//* ----------- Events -----------------*//

//! addForm
addForm.addEventListener("submit", (e) => {
  incomeTotal += Number(income.value);
  localStorage.setItem("incomeTotal", incomeTotal);

  calculateUpdate();
});

//! expenseForm

expenseForm.addEventListener("submit", () => {
  const objPaymet = {
    id: new Date().getTime(),
    date: dateInput.value,
    expenseDetail: expenseAmountInput.value,
    amount: amountInput.value,
  };

  detailArr.push(objPaymet);

  localStorage.setItem("details", JSON.stringify(detailArr));
  printToDom(objPaymet);
  calculateUpdate();
});

//* ----- Storage - Globale Cagirma ------*//

window.addEventListener("load", () => {
  incomeTotal = Number(localStorage.getItem("incomeTotal"));

  detailArr = JSON.parse(localStorage.getItem("details")) || [];

  detailArr.forEach((A) => printToDom(A));

  calculateUpdate();
});

//* ----------- Functions -----------------*//

const calculateUpdate = () => {
  const expenseTotal = detailArr.reduce(
    (a, b) => a + Number(b.expenseDetail),
    0
  );

  resultExpense.innerText = expenseTotal;
  resultIncome.innerText = incomeTotal;
  resultBalance.innerText = incomeTotal - expenseTotal;
};

const printToDom = ({ id, date, expenseDetail, amount }) => {
  tbody.innerHTML += `
<tr>
<td>${date}</td>
<td>${expenseDetail}</td>
<td>${amount}</td>
<td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
</tr>
`;
};


//* ----------- Delete -----------------*//



tbody.addEventListener("click", (e)=>{
console.log(e)
 if(e.target.classList.contains("fa-solid")){
  e.target.parentElement.parentElement.remove()
 }

 let id= e.target.id
 detailArr=detailArr.filter((A)=>A.id !=id)
 localStorage.setItem("details", JSON.stringify(detailArr))
 calculateUpdate()
})


clearBtn.addEventListener("click",()=>{
  detailArr=[]
  incomeTotal=0
  localStorage.clear()
  tbody.innerHTML=""

  calculateUpdate()
})






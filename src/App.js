import React, { useState } from "react";
import "./App.css";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";
import Alert from './components/Alert';

const App = () => {
  const [id, setId] = useState('');
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 16000 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 12000 },
  ])

  const clearItems = () => {
    setExpenses([]);
  }
  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpense)
    handleAlert({
      type: 'danger',
      text: 'Delete 했어'
    })
  }
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);

  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) { // edit button function
       const newExpenses=  expenses.map(item => { 
        return item.id === id ? {
          ...item, charge,amount} : item
       })
       setExpenses(newExpenses);
       setEdit(false)
       handleAlert({type:'success', text:"아이템이 수정 되었습니다."});
      }else { // create button function
        const newExpense = { id: crypto.randomUUID(), charge, amount }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses);
       
        handleAlert({ type: "success", text: "아이템이 생성 되었습니다." });
      }
    } else {
      handleAlert({
        type: 'danger',
        text: 'charge는 0보다 커야해'
      })
    }
    setCharge("");
    setAmount(0);
  }


  return (

    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>


      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList
          initialExpenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit} 
          clearItems={clearItems}
          />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총 지출 : <span>
            {expenses.reduce((arr, curr) => {
              return (arr += curr.amount);
            }, 0)}     원</span>
        </p>
      </div>
    </main>
  )

}



export default App;
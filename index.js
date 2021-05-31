const users = ["Alice", "Bob", "Carol", "Dylan"];

const transactions = [];

let totals = new Array(users.length);
totals.fill(0);

let finalpayments = [];

function createExpense(transaction_name, price, payeer, users_involved) {
  return {  "transaction_name" : transaction_name,
  "price": price,
  "payeer": payeer,
  "users_involved":users_involved,
  };

}

function settle(transactions){
  transactions.forEach(expense => {
    totals[expense.payeer-1] += expense.price;
    expense.users_involved.forEach(user =>{
      totals[user-1] -= expense.price / (expense.users_involved.length);
    });
  })
  console.log(totals);

  for(i = 0; i<totals.length; i++){
    if(totals[i] > 0){
      for(j = 0; j<totals.length; j++){
        console.log(totals);
        if(totals[j] < 0){
          if(totals[i] <= totals[j] * -1){
            //user paid in one tx            
            finalpayments.push(`User ${j+1} owes User ${i+1} $${totals[i]}`);
            totals[i] = 0;
            totals[j] -= totals[i];
            break; 
          }
          else{
            finalpayments.push(`User ${j+1} owes User ${i+1} $${totals[j]}`);
            totals[i] = totals[i] + totals[j]; //reduced debt
            totals[j] = 0;
          }
        }
      }
    }
  }
  console.log(finalpayments)

}

transactions.push(createExpense("groceries", 160, 1, [1,2,3,4]));
transactions.push(createExpense("gas", 40, 3, [1,2,3,4]));
transactions.push(createExpense("hotel", 400, 4, [1,2,3,4]));
transactions.push(createExpense("breakfast", 27, 2, [1,2,3]));

settle(transactions);

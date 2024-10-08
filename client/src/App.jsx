import React, { useState } from "react";
import TransactionsTable from "./Components/TransactionsTable";
import Statistics from "./Components/Statistics";
import BarCharts from "./Components/BarCharts";
import Months from "./Components/Months";
function App() {
  const [month, setMonth] = useState(6);
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <main>
      <Months month={month} handleMonthChange={handleMonthChange} />
      <TransactionsTable month={month} setMonth={setMonth} />
      <Statistics month={month} />
      <BarCharts month={month} />
    </main>
  );
}

export default App;
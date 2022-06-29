import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let page = 1;
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [equity, setEquity] = useState([]);

  const loadMoreData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/equity?page=${page}`)
      .then(({ data }) => {
        const newData = data.results;
        setEquity((oldEquity) => [...oldEquity, ...newData]);
        console.log(equity);
        if(data.next == null){
          setCanLoadMore(false)
        }else{
          page += 1;
        }
      });
    
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      
      if(canLoadMore){
        loadMoreData();
      }
      
    }
  };

  useEffect(() => {
    loadMoreData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (

    <div>

      <h1>Scraped Data</h1>
      <table>
        <thead>
          <tr>
            <th>Market Watch</th>
            <th>Balance</th>
            <th>Equity</th>
          </tr>
        </thead>
        <tbody>
          {equity.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.market_watch}</td>
                <td>{e.balance}</td>
                <td>{e.equity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

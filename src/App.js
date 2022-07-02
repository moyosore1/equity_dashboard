import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let page = 1;
  let canLoadMore = true;
  const [equity, setEquity] = useState([]);

  const loadMoreData = () => {
    let newData = [];
    axios
      .get(`https://moyoequitybot.herokuapp.com/api/equity?page=${page}`)
      .then(({ data }) => {
        newData = [...data.results];
        setEquity((equity) => [...equity, ...newData]);
        if (!data.next) {
          canLoadMore = false;
        } else {
          page += 1;
        }
      });
  };

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight && canLoadMore == true) {
      loadMoreData();
    }
  };

  useEffect(() => {
    loadMoreData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>
        Scraped Data
      </h1>
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

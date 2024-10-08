import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../css/transactionsTable.scss"
import Months from './Months';
const TransactionsTable = ({ month }) => {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        const fetchTransactions = async () => {
            console.log(import.meta.env.VITE_TRANSACTION_API_URL);
            try {
                const response = await axios.get(import.meta.env.VITE_TRANSACTION_API_URL, {
                    params: {
                        search: search,
                        page: page,
                        perPage: perPage,
                        month: month,
                    },
                });

                console.log(response.data.transactions);
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }

        fetchTransactions();
    }, [search, page, perPage, month]);


    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
    return (
        <div className="tablecontainer">

            <h2>Transaction Dashboard</h2>
            <div className="search-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>

                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price.toFixed(2)}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? "Yes" : "No"}</td>
                                <td>
                                    <img
                                        src={transaction.image}
                                        alt={transaction.title}
                                        style={{ width: "50px" }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No transactions found</td>
                        </tr>
                    )}

                </tbody>
            </table >

            <div className="pagination-controls">
                <span>Page No : {page}</span>
                <div className="pageBtns">
                    <button onClick={handlePrevPage} disabled={page === 1}>
                        Previous
                    </button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
                <span>Per Page : 10 </span>
            </div>
        </div>


    )
}

export default TransactionsTable
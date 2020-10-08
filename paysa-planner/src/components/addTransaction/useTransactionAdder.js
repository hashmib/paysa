import {useState} from 'react';

export default function useTransactionAdder() {
    const [transactions, setTransactions] = useState(
        []
    );

    function add() {
        setTransactions(transactions => (
            [...transactions, { value: "", label: "", start: new Date(), end: new Date(), frequency: "One Time" }]
        ))
    };

    function remove(element, index) {
        let currentTransactions = [...transactions];
        currentTransactions.splice(index, 1);
        setTransactions(currentTransactions)
    };

    function handleChange(element, index, event) {
        let currentTransactions = [...transactions]
        currentTransactions[index] = { ...currentTransactions[index], [event.target.name]: event.target.value }
        setTransactions(currentTransactions)
    };
    
    return [transactions, add, remove, handleChange];
}
  
import React, { createContext, useState, useContext } from 'react';

const TransactionContext = createContext({
    refreshFlag: 0,
    triggerRefresh: () => { }
});

export const TransactionProvider = ({ children }:any) => {
    const [refreshFlag, setRefreshFlag] = useState(0);

    const triggerRefresh = () => {
        setRefreshFlag(prev => prev + 1); // triggers update
    };

    return (
        <TransactionContext.Provider value={{ refreshFlag, triggerRefresh }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => useContext(TransactionContext);

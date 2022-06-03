import React, { useReducer } from 'react'
import reducer, { initialState } from '../reducer/reducer'
import Context from './context'

function Provider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider
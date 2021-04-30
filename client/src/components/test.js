import React, { Component } from 'react'

export default function Test(props){
    console.log(props)
    console.log(props.isAuth)
    const handleClick = () => {
        props.updateAuth(!props.isAuth)
    }
    return (
        <div>
            <div>Status: {props.isAuth ? 'True' : 'False'}</div>
            <button onClick={handleClick}>Click Me</button>
        </div>
      )
}
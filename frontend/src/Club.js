import React from 'react'

export default function Club({ club }) {

    console.log(club)

    return (
        <div class = "club">
            <h1 class = "club-name">
                {club.name}
            </h1>
            <p class = "message">{club.text}</p>
            <button id = "add-club"> + </button>
        </div>
    )
}
import React from 'react'

export default async function login(user) {
    const resp = await fetch("https://technical-task-api.icapgroupgmbh.com/api/login/", {
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
    })
    const data = await resp.json();
    return data;
}

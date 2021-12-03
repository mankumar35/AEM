let shrek = {
    givenName: "Shrek",
    lastName: "disneySlayer",
    username: "Shrek",
    password: "donkey",
    profile: "active",
    age:18,
    daysLeft: 50,
    secondsLeft: 10,
}

let alladin = {
    givenName: "Avani",
    lastName: "Gregg",
    username: "Avani",
    password: "avani",
    profile: "active",
    daysLeft: 28,
    age:27,
    secondsLeft: 5,
}
let mickey = {
    givenName: "Mickey",
    lastName: "Mouse",
    username: "Mickey",
    password: "pluto",
    profile: "to retain",
    daysLeft: 10,
    age:35,
    secondsLeft: 10,
}

export let calculateRemainingDays = (user) => {
    return user.daysLeft + user.secondsLeft/(60*60*24)
}

export let customerList = [shrek, alladin, mickey]


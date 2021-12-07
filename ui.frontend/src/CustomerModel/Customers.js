let shrek = {
    givenName: "Shrek",
    lastName: "disneySlayer",
    username: "Shrek",
    password: "donkey",
    profile: "active",
    daysLeft: 50,
    secondsLeft: 10,
    locationCity: "sydney",
}

let avani = {
    givenName: "Avani",
    lastName: "Gregg",
    username: "Avani",
    password: "avani",
    profile: "active",
    daysLeft: 30,
    secondsLeft: 5,
    age:27,
    insuranceAge:5,
    locationCity: "melbourne",
}
let sammy = {
    givenName: "Sam",
    lastName: "Antha",
    username: "Sam",
    password: "Sammy",
    profile: "to retain",
    daysLeft: 10,
    locationCity:"sydney",
    age:18,
    insuranceAge:2,
    secondsLeft: 10,
}
export let calculateRemainingDays = (user) => {
    return user.daysLeft + user.secondsLeft/(60*60*24)
}

export let customerList = [shrek, avani, sammy]


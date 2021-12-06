let shrek = {
    givenName: "Shrek",
    lastName: "disneySlayer",
    username: "Shrek",
    password: "donkey",
    profile: "active",
    daysLeft: 50,
    locationCity:"melbourne",
    age:37,
    insuranceAge:3,
    secondsLeft: 10,
}

let avani = {
    givenName: "Avani",
    lastName: "Gregg",
    username: "Avani",
    password: "avani",
    profile: "active",
    daysLeft: 28,
    locationCity:"sydney",
    age:27,
    insuranceAge:5,
    secondsLeft: 5,
}
let sam = {
    givenName: "Sam",
    lastName: "Curran",
    username: "Sam",
    password: "sammy",
    profile: "active",
    daysLeft: 28,
    locationCity:"sydney",
    age:26,
    insuranceAge:2,
    secondsLeft: 5,
}

export let calculateRemainingDays = (user) => {
    return user.daysLeft + user.secondsLeft/(60*60*24)
}

export let customerList = [shrek, avani, sam]


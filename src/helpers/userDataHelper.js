import fs from 'fs'

export function getUsersFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('./users.json', 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
}

export function saveUsers(users) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./users.json', JSON.stringify(users), 'utf8', err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function getUsers() {
    try {
        const users = await getUsersFromFile();
        console.log(users)
        return users || []
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getUserByFilter(filter, value) {
    try {
        const users = await getUsersFromFile();
        const user = users.find(user => user[filter] === value)
        return user || {}
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function addUser(user) {
    try {
        const users = await getUsers()
        users.push(user)
        await saveUsers(users)
    } catch (err) {
        throw new Error(err.message)
    }
}

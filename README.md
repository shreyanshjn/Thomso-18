# Thomso 18

For Development, run `npm start`

For Build, run `npm build`

To Serve the build, run `npm run serve`

# How to install locally:

> Run `npm install`

> Install mongo

> Create mongo-data folder

> Start mongo server by navigating to the bin on mongodb and run `./mongod --dbpath ~/mongo-data`

> Build and Serve

# Create Mongo Role and User:

`use <DatabaseName>`

<<<<<<< HEAD
`db.createRole({
  createRole: "adminuser",
  privileges: [
    {
=======
`db.createRole({`
`createRole: "adminuser",`
`privileges: [`
`{
>>>>>>> f1ed10f1debe2d5bd31af6bca75dba9d599856d2

      resource: { db: "<DatabaseName>", collection: "" },

      actions: [ "find","insert","update","createIndex","createCollection","remove" ]

<<<<<<< HEAD
    }
  ],
  roles: [{ role: "read", db: "<DatabaseName>"}]
})`
=======
    }`

`],`
`roles: [{ role: "read", db: "<DatabaseName>"}]`
`})`
>>>>>>> f1ed10f1debe2d5bd31af6bca75dba9d599856d2

`db.createUser({"user" : "<DatabaseUser",pwd: "<DatabasePassword>", "roles" : [{"role" : "adminuser", "db" : "<DatabaseName>"}]})`

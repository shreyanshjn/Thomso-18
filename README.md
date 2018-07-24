# Thomso 18

For Development, run `npm start`

For Build, run `npm build`

To Serve the build, run `npm prod`

# How to install locally:

> Run `npm install`

> Install mongo

> Create mongo-data folder

> Start mongo server by navigating to the bin on mongodb and run `./mongod --dbpath ~/mongo-data`

> Build and Serve

# Create Mongo Role and User:

`use <DatabaseName>`

`db.createRole({`
`createRole: "adminuser",`
`privileges: [`
`{

      resource: { db: "<DatabaseName>", collection: "" },

      actions: [ "find","insert","update","createIndex","createCollection","remove" ]

    }`

`],`
`roles: [{ role: "read", db: "<DatabaseName>"}]`
`})`

`db.createUser({"user" : "<DatabaseUser",pwd: "<DatabasePassword>", "roles" : [{"role" : "adminuser", "db" : "<DatabaseName>"}]})`

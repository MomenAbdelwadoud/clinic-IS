/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  collection.createRule = "@request.auth.role = 'doctor'"

  return dao.saveCollection(collection)
})
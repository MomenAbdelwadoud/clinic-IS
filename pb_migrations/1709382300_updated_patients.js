/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "potcnkqz",
    "name": "condition",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "green",
        "red"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  // remove
  collection.schema.removeField("potcnkqz")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  // remove
  collection.schema.removeField("decgdkio")

  // remove
  collection.schema.removeField("jtzh6phd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x43xclqp",
    "name": "notes",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "msgut7xz",
    "name": "prescription",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("riao0kw6gwr8j1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "decgdkio",
    "name": "Prescription",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jtzh6phd",
    "name": "Notes",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("x43xclqp")

  // remove
  collection.schema.removeField("msgut7xz")

  return dao.saveCollection(collection)
})

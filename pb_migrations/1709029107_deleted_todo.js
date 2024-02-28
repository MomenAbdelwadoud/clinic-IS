/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vwkkbq1bencpewm");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vwkkbq1bencpewm",
    "created": "2024-02-27 10:10:38.044Z",
    "updated": "2024-02-27 10:11:58.716Z",
    "name": "todo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cfpagztp",
        "name": "test",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

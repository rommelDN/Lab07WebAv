const getBlogCollection = require('../../connect2');

module.exports = async function listPost() {
  try {
    const collection = await getBlogCollection();
    // Ahora puedes utilizar "collection" para realizar operaciones en "blog1"
    // Por ejemplo, collection.find(), collection.insertOne(), etc.
    // Utiliza el método find() para obtener todos los documentos en la colección
    const documents = await collection.find({}).toArray();

    // Imprime los documentos en la consola
    console.log("Documentos en la colección 'blog1':");
    //console.log(documents);
    return documents;
  } catch (error) {
    console.error("Error:", error);
  }
};



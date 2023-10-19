const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rommelhurtado:ehebV4WyCzIPUQ9y@blog.7gb9uoy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Exporta la colección como un módulo
module.exports = async function getBlogCollection() {
  try {

    await client.connect();//se utiliza para esperar que se complete una operación asincrónica antes de continuar con el flujo de ejecución del programa. 
    console.log("Connected to MongoDB Atlas!");

    // Selecciona la base de datos y la colección
    const database = client.db("blog");
    const collection = database.collection("blog1");

    // Devuelve la colección para que pueda ser utilizada en otros archivos
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

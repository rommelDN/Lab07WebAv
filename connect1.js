const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rommelhurtado:ehebV4WyCzIPUQ9y@blog.7gb9uoy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    // Selecciona la base de datos y la colección
    const database = client.db("blog");
    const collection = database.collection("blog1");

    // Realiza una consulta en la colección
    const query = {}; // Esto recuperará todos los documentos, puedes ajustar el query según tus necesidades.
    const results = await collection.find(query).toArray();

    // Muestra los resultados en la consola
    console.log("Documentos en la colección 'blog1':");
    console.log(results);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);



const getBlogCollection = require('../../connect2');
// Exporta una función asincrónica que crea un nuevo post en la base de datos MongoDB
module.exports = async function createPost(newPost) {
  try {
    // Obtiene la colección de la base de datos utilizando una función auxiliar
    const collection = await getBlogCollection();

    // Obtiene el último _id en la colección y aumenta en 1 para generar un nuevo _id
    const lastPost = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    let newId = 1; // Valor predeterminado si es el primer post

    // Verifica si existen posts previos en la colección
    if (lastPost.length > 0) {
      newId = lastPost[0]._id + 1;
    }

    // Establece el nuevo _id en el objeto newPost
    newPost._id = newId;

    // Inserta el nuevo post en la colección
    const result = await collection.insertOne(newPost);

    // Verifica si la inserción fue exitosa
    if (result) {
      console.log("Nuevo post creado con éxito.");
      return newPost; // Devuelve el post creado.
    } else {
      console.error("Error al insertar el nuevo post en la colección.");
      return null;
    }
  } catch (error) {
    console.error("Error al crear el nuevo post:", error);
    return null;
  }
};

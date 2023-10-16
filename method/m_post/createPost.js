const getBlogCollection = require('../../connect2');

module.exports = async function createPost(newPost) {
  try {
    const collection = await getBlogCollection();

    // Obtén el último _id en la colección y aumenta en 1
    const lastPost = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    let newId = 1; // Valor predeterminado si es el primer post

    if (lastPost.length > 0) {
      newId = lastPost[0]._id + 1;
    }

    // Establece el nuevo _id en el objeto newPost
    newPost._id = newId;

    // Inserta el nuevo post en la colección
    const result = await collection.insertOne(newPost);

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

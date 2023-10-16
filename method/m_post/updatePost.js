const getBlogCollection = require('../../connect2');

module.exports = async function updatePost(idPost, updatedData) {
  try {
    const collection = await getBlogCollection();

    // Busca el post por su _id
    const _id = parseInt(idPost, 10); // Convierte el _id a un número entero (base 10)
    const filter = { _id: _id };

    // Crea un objeto de actualización con los campos a modificar en updatedData
    const updateDoc = {
      $set: updatedData
    };

    const result = await collection.updateOne(filter, updateDoc);

    if (result) {
      console.log("Post editado exitosamente.");
      return true;
    } else {
      console.log("No se pudo editar el post.");
      return false;
    }
  } catch (error) {
    console.error("Error al editar el post:", error);
    return false;
  }
};

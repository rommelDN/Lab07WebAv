const getBlogCollection = require('../../connect2');

module.exports = async function deletePost(postId) {
  try {
    const collection = await getBlogCollection();

    // Convierte postId a un número entero si es necesario
    const _id = parseInt(postId, 10);

    // Crea un filtro para encontrar el post por su _id
    const filter = { _id };

    // Utiliza el método deleteOne para eliminar el post
    const result = await collection.deleteOne(filter);

    if (result) {
      console.log("Post eliminado exitosamente.");
      return true;
    } else {
      console.log("No se pudo eliminar el post.");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    return false;
  }
};

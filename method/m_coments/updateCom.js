const getBlogCollection = require('../../connect2');

module.exports = async function updateCom(postId, commentIndex, updatedComment) {
  try {
    const collection = await getBlogCollection();
    // Convierte postId en un número entero (si aún no lo es)
    const postIdInt = parseInt(postId, 10);
    // Verifica si el post con el _id dado existe
    const postExists = await collection.findOne({ _id: postIdInt });
    if (!postExists) {
      console.error("El post con el _id especificado no existe.");
      return null;
    }
    // Verifica que el índice del comentario esté dentro de los límites del array de comentarios
    if (commentIndex < 0 || commentIndex >= postExists.comentarios.length) {
      console.error("El índice del comentario no es válido.");
      return null;
    }
    // Define un objeto que representa el comentario actualizado
    const updatedCommentData = {
      autor: updatedComment.autor,
      mensaje: updatedComment.mensaje,
      fecha: updatedComment.fecha
    };
    // Actualiza el comentario dentro del array "comentarios"
    postExists.comentarios[commentIndex] = updatedCommentData;
    // Actualiza el documento correspondiente en la colección
    const result = await collection.updateOne(
      { _id: postIdInt },
      { $set: { comentarios: postExists.comentarios } }
    );
    if (result.modifiedCount) {
      console.log("Comentario actualizado con éxito.");
      return updatedCommentData; // Devuelve el comentario actualizado.
    } else {
      console.error("Error al actualizar el comentario.");
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar el comentario:", error);
    return null;
  }
};

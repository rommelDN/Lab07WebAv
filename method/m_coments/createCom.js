const getBlogCollection = require('../../connect2');

module.exports = async function createCom(postId, newComment) {
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
      // Define un objeto que representa el nuevo comentario
      const comment = {
        autor: newComment.autor,
        mensaje: newComment.mensaje,
        fecha: newComment.fecha
      };
      // Actualiza el documento correspondiente en la colección
      const result = await collection.updateOne(
        { _id: postIdInt }, // Filtra el documento por su _id (como número entero)
        { $push: { comentarios: comment } } // Agrega el comentario al array "comentarios"
      );
      if (result.modifiedCount) {
        console.log("Nuevo comentario agregado con éxito.");
        return comment; // Devuelve el comentario creado.
      } else {
        console.error("Error al agregar el comentario al post.");
        return null;
      }
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      return null;
    }
  };
  

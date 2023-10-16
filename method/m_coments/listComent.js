const getBlogCollection = require('../../connect2');

module.exports = async function listComments() {
  try {
    const collection = await getBlogCollection();
    const comments = await collection.find({}, { "comentarios": 1, "_id": 1 }).toArray();

    // Procesa los comentarios para manejar el caso de documentos sin comentarios
    const formattedComments = comments.map((document) => {
      return {
        _id: document._id,
        comentarios: document.comentarios || [] // Si no hay comentarios, se establece como un array vacío
      };
    });

    // Imprime los comentarios en la consola
    console.log("Comentarios en la colección 'blog1':");
    console.log(formattedComments);
    return formattedComments;
  } catch (error) {
    console.error("Error:", error);
  }
};

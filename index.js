const express = require('express');
const bodyParser = require('body-parser'); // Importa body-parser
const app = express();

const listPost = require('./method/m_post/listPost'); // Asegúrate de que la ruta sea correcta.
const createPost = require('./method/m_post/createPost');
const updatePost = require('./method/m_post/updatePost');
const deletePost = require('./method/m_post/deletePost');

const listComments = require('./method/m_coments/listComent');
const createCom = require('./method/m_coments/createCom');
const updateCom = require('./method/m_coments/updateCom');

app.set('view engine', 'pug');
// Configura body-parser para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/List_post', async (req, res) => {
  try {
    const documents = await listPost(); // Espera a que la promesa se resuelva
    res.render('list_posts', { documents }); // Renderiza la vista y pasa los documentos como datos
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los documentos' });
  }
});

app.get('/form_CrPost', (req, res) => {
  res.render('form_create'); // "formulario" es el nombre de tu archivo Pug (sin la extensión .pug)
});

app.post('/Create_post', async (req, res) => {
  try {
    // Captura los datos del formulario desde req.body
    const { titulo, descripcion, categoria, fecha } = req.body;

    // Crea un nuevo post con los datos del formulario
    const newPost = {
      
      titulo,
      descripcion,
      categoria,
      fecha,
      comentarios: []
    };

    // Llama a la función createPost para insertar el nuevo post
    const createdPost = await createPost(newPost);

    if (createdPost) {
      console.log("Nuevo post creado:", createdPost);
      //res.status(201).json(createdPost); // Devuelve el nuevo post como respuesta
      res.redirect('/List_post');
    } else {
      console.log("No se pudo crear el nuevo post.");
      res.status(500).json({ error: 'No se pudo crear el nuevo post' });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.get('/form_UpPost', (req,res)=>{
  res.render('form_update');
  
});

app.post('/Update_post', async (req, res) => {
  try {
    const _id = req.body._id; // Reemplaza 'postId' con el nombre correcto del campo que contiene el ID del post.
    const updatedData = {};

    if (req.body.titulo) {
      updatedData.titulo = req.body.titulo;
    }
    if (req.body.descripcion) {
      updatedData.descripcion = req.body.descripcion;
    }
    if (req.body.categoria) {
      updatedData.categoria = req.body.categoria;
    }
    if (req.body.fecha) {
      updatedData.fecha = req.body.fecha;
    }
    if (req.body.comentarios) {
      updatedData.comentarios = req.body.comentarios;
    }

    const success = await updatePost(_id, updatedData);

    if (success) {
      res.status(200).json({ message: 'Post editado exitosamente' });
    } else {
      res.status(500).json({ error: 'No se pudo editar el post' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.get('/form_DelPost',(req,res)=>{
  res.render('form_delete');
});

app.post('/Delete_post', async (req, res) => {
  try {
    const _id = req.body._id; // Asegúrate de que el nombre del campo coincida con el formulario

    const success = await deletePost(_id);

    if (success) {
      res.status(200).json({ message: 'Post eliminado exitosamente' });
    } else {
      res.status(500).json({ error: 'No se pudo eliminar el post' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.get('/List_comments',async (req,res)=>{
  try {
    const comments = await listComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({error: 'Error al listar los comentarios'});
  }
});

app.get('/form_CrCom', (req, res) => {
  res.render('form_cr_com'); // "formulario" es el nombre de tu archivo Pug (sin la extensión .pug)
});

app.post('/Create_com', async (req, res) => {
  try {
    const _id = req.body._id; // El _id del post al que deseas agregar un comentario
    const { autor, mensaje, fecha } = req.body; // Datos del comentario

    // Crea un objeto que representa el nuevo comentario
    const newComment = {
      autor,
      mensaje,
      fecha
    };

    // Llama a la función addCommentToPost para agregar el comentario al post
    const addedComment = await createCom(_id, newComment);

    if (addedComment) {
      console.log("Nuevo comentario agregado:", addedComment);
      res.status(201).json(addedComment); // Devuelve el nuevo comentario como respuesta
    } else {
      console.log("No se pudo agregar el nuevo comentario al post.");
      res.status(500).json({ error: 'No se pudo agregar el comentario al post' });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.get('/form_UpCom', (req, res) => {
  res.render('form_up_com'); // "formulario" es el nombre de tu archivo Pug (sin la extensión .pug)
});

app.post('/Update_com' , async (req , res)=>{
  try {
    const _id = req.body._id;
    const index = req.body.index;
    const {autor,mensaje,fecha}=req.body

    const updateComm={
      autor,
      mensaje,
      fecha
    };

    const updateComments = await updateCom(_id,index,updateComm);
    if(updateComments){
      console.log("Comentario actualizado: ",updateComments);
      res.status(201).json(updateComments);
    }else{
      console.log("No se pudo actualizar el comentario");
      res.status(500).json({error: "No se pudo actualiar el comentario"});
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
})

// Escucha en un puerto específico
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

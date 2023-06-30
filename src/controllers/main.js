const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const db = require('../database/models');


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database
    db.Book.findByPk(req.params.id, {
      include: ['authors']
  })
      .then(libro => {

          res.render('bookDetail.ejs', { libro })
      }) .catch((error) => console.log(error))
      ;
   
  },
  bookSearch: (req, res) => {
    db.Book.findAll({
      where : {
        title : {
          [Op.like] : `%${req.query.search}%`
        }
      },
      include :['authors']
    }).then(books=>{
   res.render('search',{
    books
  })
    })
/*     res.render('results', { books: [] }); */
  },
/*   bookSearchResult: (req, res) => {
    // Implement search by title
   
  }, */
  deleteBook: (req, res) =>{
    // Implement delete book
  
      db.Book.destroy({
       where : {id:+req.params.id},
       force:true
      }).then(()=>{
        res.redirect('/')
      })
      .catch(error => console.log(error))
       
   

  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks:async (req,res) => {
    const autorId = req.params.id
    try {
      const autor = await db.Author.findByPk(autorId, { include: 'books' })
      if (!autor) {
        throw new Error('Autor no encontrado')
      }
      res.render('authorBooks', { autor })
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({
        ok:false,
        error : {
            status : error.status || 500,
            message : error.message || 'Upss hubo un error' 
        }
    })
    }
  
  /*   res.render('authorBooks'); */
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: async (req, res) => {
    // Implement edit book
    try {
      const id =+req.params.id;
      const libro = await db.Book.findByPk(id);
      res.render('editBook', { 
        ...libro.dataValues 
      })

     /* console.log(libro) */
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({
        ok:false,
        error : {
            status : error.status || 500,
            message : error.message || 'Upss hubo un error' 
        }
    })
    }
  },
  processEdit: async (req, res) => {
    // Implement edit book
   /*  const {title,cover,description}  = req.body;

    const id = req.params.id */
 
try {

  /* const {title,cover,description} = req.body */
 /*  const libro = await db.Book.findByPk(id); */

    await db.Book.update(
      {  ...req.body
        
      },
     {  where:{
      id: req.params.id
  } } 
    )

    
    return res.redirect('/books/detail/'+ req.params.id)
}  catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({
        ok:false,
        error : {
            status : error.status || 500,
            message : error.message || 'Upss hubo un error' 
        }
    })
    }
    /*    db.Book.update(
        
            {
                title: title.trim(),
                cover : cover ,
                description : description,
            },
            {
                where : {id}
            }
            
              )
              .then(libro => {
              
    return res.redirect('home',
  {...libro
         })
              })
               
    
    .catch(error=> console.log(error)) */
  }
};

module.exports = mainController;

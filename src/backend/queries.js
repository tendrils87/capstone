const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'pgdb',
    port: 5432
});

const login = (req,res) => {
    let username=req.params.username;
    let password=req.params.password;
    pool.query(`SELECT id,first,last FROM users WHERE username=$1 AND password=crypt($2,password);`,[username,password], (err,result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}
const getPosts = (req, res) => {
    let userid=req.params.userid
    let filter=req.params.filter
    if(filter === '2'){
        pool.query(`SELECT * FROM posts WHERE user_id=$1;`, [userid], (err, result) => {
            if(err) {
                throw err;
            }
            res.status(200).send(result.rows);
        })
    }else{
        pool.query(`SELECT * FROM posts`, (err, result) => {
            if(err) {
                throw err;
            }
            res.status(200).send(result.rows);
        })        
    }
}

const addPost = (req, res) =>  {
    const post = req.body;
    if(post.title && post.userid && post.content){
        pool.query("INSERT INTO posts ( user_id, title, content) VALUES ($1, $2, $3);", [post.userid, post.title, post.content], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("Post created.");
        })
    }else{
        res.status(400).send("Post creation failed.");
    }

}

const editPost = (req, res) =>  {
    const post = req.body;
    if(post.post_id && post.title && post.content){
        pool.query("UPDATE posts SET title=$1, content=$2 WHERE post_id=$3;", [post.title, post.content, post.post_id], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("Post created.");
        })
    }else{
        res.status(400).send("Post creation failed.");
    }

}

const deletePost = (req, res) =>  {
    const post = req.body;
    if(post.post_id){
        pool.query("DELETE FROM posts WHERE post_id=$1;", [post.post_id], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("Post deleted.");
        })
    }else{
        res.status(400).send("Post deletion failed.");
    }

}

const addUser = (req, res) =>  {
    const user = req.body;
    if(user.username && user.password && user.firstname && user.lastname){
        pool.query(`INSERT INTO users(first,last,username,password) VALUES ($1, $2, $3,crypt($4,gen_salt('bf')));`, [user.firstname, user.lastname, user.username, user.password], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("User created.");
        })
    }else{
        res.status(400).send("User creation failed.");
    }

}
module.exports = {
    login,
    getPosts,
    addPost,
    editPost,
    deletePost,
    addUser
    };
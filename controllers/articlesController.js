const Article=require('../model/Article');

const getArticles=async(req,res)=>{
    const articles=await Article.find();
    if(!articles) return res.status(204).json({"message":'No articles found in DB'});
    res.json(articles);
}
const postArticle=async(req,res)=>{
    if(!req?.body?.content) return res.status(201).json({"message":'article has to have some content'});
    try{
        const newArticle=await Article.create({
            title: req.body.title,
            author: req.body.author,
            tag: req.body.tag,
            datePublished: req.body.datePublished,
            content: req.body.content,
            thumbnail: req.body.thumbnail,
            displayed:req.body.displayed
        });
        if(newArticle)
            res.json(newArticle);
    }
    catch(err){
        console.log(err);
    }
}
const deleteArticle=async (req,res)=>{
    if(!req?.body?._id) {
        //console.log('yoh');
        return res.status(201).json({"message":'article has to have id'});}
    try{
        console.log('noticed');
        const deleted=await Article.findOne({_id:req.body._id}).exec();
        if(!deleted) return res.status(204).json({"message":`No article matches ID ${req.body._id}`});
        const result=await Article.deleteOne({_id:req.body._id});
        res.json(result);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
    
}


module.exports={
    getArticles,
    postArticle,
    deleteArticle
}
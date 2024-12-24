const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({ 
    destination:function(req,file,cb){
        cb(null,'./public/pfps');
    },
    filename:function(req,file,cb){
        cb(null,req.userid+'_pfp'+path.extname(file.originalname));
    }
});

const upload=multer({storage});
module.exports=upload;
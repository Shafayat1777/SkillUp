const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/upload/user_avatars')
    },
    filename: (req, file, cb) => {
       let ext = path.extname(file.originalname)
       cb(null, Date.now() + ext) 
    }
})

const upload = multer({
    storage: storage
    // fileFilter: function(req, file, callback){
    //     if(file.mimetype == "image/png" || file.mimetype == "image/jpg"){
    //         callback(null, true)
    //     }else{
    //         console.log('only jpg & png files supported!')
    //         callback(null, false)
    //     }
    // }
    // limits: {
    //     fileSize: 1024 * 1024 * 2
    // }
})

module.exports = upload

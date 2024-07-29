const User = require('../models/user')

exports.manageDocs = async (req, res) => {
    try {
        const userId = req.userId; 
        const user = User.findById({userId});
        const { type } = req.params;
        const files = req.files.map(file =>{
            return file.path.replace("\\", "/");
        });
        if (files.length < 1) {
            return res.status(404).json({error:'Documents could not be found'})
        }
        if (type === 'profile') {
            user.image = files[0];
        }
        else if (type === 'passport') {
            user.passport = files;
        }
        else if (type === 'license'){
            user.license = files;
        }
        res.json({message:'Documents uploaded successfully'})
        console.log(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }
};
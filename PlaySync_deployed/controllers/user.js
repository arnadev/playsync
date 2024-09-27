const User = require('../models/user');
const Friend = require('../models/friend');
const Profile = require('../models/profile');
const Schedule = require('../models/schedule');
const { setUser } = require('../services/auth');
const upload = require('../services/fileupload');



//handle sign up
const handleUserSignup = async (req, res) => {
    const { username, email, password,nickname,age,gender } = req.body;
    // Check if the username contains spaces
    if (/\s/.test(username)) {
        return res.status(400).render('signup', {
            err: 'Username should not contain spaces. Please remove spaces and try again.'
        });
    }

    //create user document
    const createdUser=await User.create({ username, email, password});
    //create profile document
    await Profile.create({
        belongsTo: createdUser._id,
        profilePictureName: 'other-pfp-placeholder.jpg',
        nickname:nickname,
        age : age,
        gender: gender,

    });
    //create friend document
    await Friend.create({userId:createdUser._id});

    //set token and redirect to home
    const token=setUser(createdUser._id);
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).redirect('/home');    
};

//handle login
const handleUserLogin = async (req, res) => {

    //check if user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    //if user does not exist, return error
    if (!user) {
        return res.status(400).render('login', {
            err: 'invalid username or password'
        });
    }
    //set token and redirect to home
    const token=setUser(user._id);
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).redirect('/home');
};


//handle profile update
const handleUserProfileUpdate = async (req, res) => {

    await Profile.findOneAndUpdate(
        { belongsTo: req.userid }, // Query condition
        {  // Fields to update
          nickname: req.body.nickname,
          bio: req.body.bio,
          age: req.body.age,
          gender: req.body.gender,
        },
        { runValidators: true} // Options: runValidators ensures validations
    );
    return res.redirect('/profile');
};



//handle search
const handleSearch = async (req, res) => {
    const searchList = await User.find({ username: { $regex: req.body.searchValue, $options: 'i' } },'username');
    const user=await Friend.findOne({userId:req.userid});
    return res.render('friend',{
        friendsList:user.friendsList,
        friendRequests:user.friendRequests,
        searchList:searchList,
    });
};




//handle friend
const handleFriend = async (req, res) => {

    //send friend request
    if(req.body.action=='addFriend'){
        const friendRequestReceiver=await User.findOne({username:req.body.requestReceiver});
        const friendRFequestSender=await User.findOne({_id:req.userid});

        await Friend.findOneAndUpdate({userId:friendRequestReceiver._id},{
            $push:{friendRequests:friendRFequestSender.username}
        });
        return res.status(200).send({success: 'Request sent'});
    }

    //accept friend request
    if(req.body.action=='acceptFriend'){
        const friendRequestSender=await User.findOne({username:req.body.requestSender});
        if(friendRequestSender==null){
            return res.status(400).send({error: 'User not found'});
        }
        const friendRequestReceiver=await User.findOne({_id:req.userid});

        await Friend.findOneAndUpdate({userId:friendRequestReceiver._id},{
            $pull:{friendRequests:friendRequestSender.username}
        });


        await Friend.findOneAndUpdate({userId:friendRequestSender._id},{
            $push:{friendsList:friendRequestReceiver.username}
        });

        await Friend.findOneAndUpdate({userId:friendRequestReceiver._id},{
            $push:{friendsList:friendRequestSender.username}
        });
        return res.status(200).send({success: 'Friend added'});
    }

    //unsend friend request
    if(req.body.action=='unsendRequest'){ //unsend friend request
        const friendRequestLoser=await User.findOne({username:req.body.requestReceiver});
        if(friendRequestLoser==null){
            return res.status(400).send({error: 'User not found'});
        }
        const friendRequestRemover=await User.findOne({_id:req.userid});

        await Friend.findOneAndUpdate({userId:friendRequestLoser._id},{
            $pull:{friendRequests:friendRequestRemover.username}
        });
        return res.status(200).send({success: 'Request Deleted'});
    }


    //remove friend
    if(req.body.action=='removeFriend'){ //remove friend
        const friendLoser=await User.findOne({username:req.body.requestReceiver});
        if(friendLoser==null){
            return res.status(400).send({error: 'User not found'});
        }
        const friendRemover=await User.findOne({_id:req.userid});

        await Friend.findOneAndUpdate({userId:friendLoser._id},{
            $pull:{friendsList:friendRemover.username}
        });
        await Friend.findOneAndUpdate({userId:friendRemover._id},{
            $pull:{friendsList:friendLoser.username}
        });
        return res.status(200).send({success: 'Friend Removed'});
    }
};


const handleProfilePictureUpload =async(req,res)=>{
    console.log(req.file);
    await Profile.findOneAndUpdate({belongsTo:req.userid},{profilePictureName:req.file.filename});
    return res.status(200).redirect('/profile');
};

const handleProfilePictureDelete =async(req,res)=>{
    const newName=`${req.body.gender=='unset'?'other':req.body.gender}-pfp-placeholder.jpg`;
    await Profile.findOneAndUpdate({belongsTo:req.userid},{profilePictureName:newName});
    return res.status(204).send();
};

const handleJoinSchedule = async (req, res) => {
    const location=req.body.location;
    const sport=req.body.sport;
    const scheduleTime=req.body.scheduleTime;
    const user=await User.findOne({_id:req.userid});
    const schedule= await Schedule.findOne({location:location,sport:sport});
    if(schedule==null){
        return res.status(400).send({error: 'Schedule not found'});
    }
    else if(schedule.slots.find(slot=>slot.time==scheduleTime).players.includes(user.username)){
        return res.status(400).send({error: 'Already joined'});
    }

    await Schedule.findOneAndUpdate(
        {
        location:location,
        sport:sport,
        'slots.time':scheduleTime,
        },
        {
        $push: {'slots.$.players': user.username}
        },
        { runValidators: true},
    );
    return res.status(200).send({success: 'Joined'});
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserProfileUpdate,
    handleFriend,
    handleProfilePictureUpload,
    handleProfilePictureDelete,
    handleSearch,
    handleJoinSchedule,
};


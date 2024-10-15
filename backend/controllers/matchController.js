import User from '../models/userModel.js';

export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId);

        if (!likedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId);
            await currentUser.save();

            //  IF THE OTHER USER ALREADY LIKED THIS PROFILE, ITS A MATCH => UPDATE BOTH USERS MATCHES ARRAY
            if (likedUser.likes.includes(currentUser.id)) {
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser.id);
                await Promise.all([currentUser.save(), likedUser.save()]);

                //TODO SEND NOTIFICATION IF IT IS A MATCH USING SOCKET.IO
            }

        }
        
        res.status(200).json({
            success: true,
            user: currentUser,
        });
        
    } catch (error) {
        console.log('Error in swipeRight: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const swipeLeft = async (req, res) => {
    try {
        const { dislikedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);

        if (!currentUser.dislikes.includes(dislikedUserId)) {
            currentUser.dislikes.push(dislikedUserId);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            user: currentUser,
        });
    } catch (error) {
        console.log('Error in swipeLeft: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate(
            'matches',
            'name, image'
        );
        res.status(200).json({
            success: true,
            matches: user.matches,
        });
    } catch (error) {
        console.log('Error in getMatches: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const getUserProfiles = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const users = await User.find({
            $and: [
                { _id: { $ne: req.user.id } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.dislikes } },
                { _id: { $nin: currentUser.matches } },
                {
                    gender:
                        currentUser.genderPreference === 'both'
                            ? { $in: ['male', 'female'] }
                            : currentUser.genderPreference,
                },
                { genderPreference: { $in: [currentUser.gender, 'both'] } },
            ],
        });

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.log('Error in getUserProfiles: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

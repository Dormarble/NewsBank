import mongoose from 'mongoose';

import User from '../../../../models/users.js';

const code = {
    SUCCESS: 0,
    UNEXIST_ID: 1,
    SERVER_ERR: 2
};

async function handler(req, res) {
    const user = await User.findOne()
    .where('uid').equals(req.body.id);

    if(!user) {
        return res.json({
            error: `id doesn't exist`,
            code: code.UNEXIST_ID
        })
    }
    
    return res.json({
        message: 'find id',
        salt: user.salt,
        code: code.SUCCESS
    })
}

export default handler
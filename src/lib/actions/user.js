import User from './User';

import  {connect} from "@/lib/mongoDb/mongoose";
import mongoose from "mongoose";


export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    username
) => {

    try {
        await connect();
        const user = await User.findOneAndUpdate(
            {clerkId:id},
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    avatar: image_url,
                    email: email_addresses[0].email_addresses,
                    username: username ? username : null,
                },

            },
            { new: true, upsert: true }
        );
        return user;
    }catch (error) {
        console.error(error);
    }

};

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({clerkId:id});
    }catch (error) {
        console.error('Error delete user',error);
    }
};

const userModel = require("../models/userModel");

const getAllUsers = async (req, res ) =>{
    try {

      const users = await userModel.find({ });
      res.status(200).json(users)
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      
    }

  }

  
  // edit controller
  const editUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL
    const { name, email, password } = req.body; // Get updated data from the request body
  
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error.message,
      });
    }
  };

  //delete controller

  const deleteUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL
  
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
    }
  };
  

// login Callback
const loginController = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email, password})
        
        if (!user) {
           return res.status(404).sends("user not found");
            
        }
        res.status(200).json({
            success:true,
            user,
        }
        )
    } catch (error) {
        res.status(400).json({
            success:false,
            error,

        });
        
    }
}

// Register Callback
const registerController = async (req, res) =>{
    try {

        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).json({
            success:true,
            newUser
        })

        
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
        
    }
}

module.exports = {loginController, registerController, getAllUsers, editUser, deleteUser}
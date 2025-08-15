import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Constants for Uyo-specific validation
const ALLOWED_CITY = "Uyo";
const ALLOWED_STATE = "Akwa Ibom";
const ALLOWED_COUNTRY = "Nigeria";
const PINCODE_LENGTH = 6; // Nigerian postal codes are 6 digits

export const addAddressController = async (req, res) => {
  try {
    const { address_line, city, state, pincode, country, mobile } = req.body;
    
    // Input validation
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.status(400).json({
        success: false,
        error: "All address fields are required"
      });
    }

    // Validate Uyo-specific requirements
    if (city !== ALLOWED_CITY) {
      return res.status(400).json({
        success: false,
        error: `We only deliver within ${ALLOWED_CITY}`
      });
    }

    if (state !== ALLOWED_STATE) {
      return res.status(400).json({
        success: false,
        error: `We only operate in ${ALLOWED_STATE} state`
      });
    }

    if (country !== ALLOWED_COUNTRY) {
      return res.status(400).json({
        success: false,
        error: "We currently only deliver in Uyo, Nigeria"
      });
    }

    // Validate pincode format
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        error: "Pincode must be 6 digits"
      });
    }

    // Validate Nigerian phone number
    if (!/^(\+234|0)[789][01]\d{8}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid Nigerian phone number"
      });
    }

    const newAddress = await AddressModel.create({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: req.userId
    });

    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { address_details: newAddress._id }
    });

    return res.status(201).json({
      success: true,
      message: "Uyo address created successfully",
      data: newAddress
    });

  } catch (error) {
    console.error("Add address error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to add address"
    });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const { _id, city, state, country, ...updateData } = req.body;

    // Prevent changing location outside Uyo
    if (city && city !== ALLOWED_CITY) {
      return res.status(400).json({
        success: false,
        error: `Cannot change city from ${ALLOWED_CITY}`
      });
    }

    if (state && state !== ALLOWED_STATE) {
      return res.status(400).json({
        success: false,
        error: `Cannot change state from ${ALLOWED_STATE}`
      });
    }

    if (country && country !== ALLOWED_COUNTRY) {
      return res.status(400).json({
        success: false,
        error: `Cannot change country from ${ALLOWED_COUNTRY}`
      });
    }

    const updatedAddress = await AddressModel.findOneAndUpdate(
      { _id, userId: req.userId },
      updateData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        error: "Address not found"
      });
    }

    return res.json({
      success: true,
      message: "Uyo address updated",
      data: updatedAddress
    });

  } catch (error) {
    console.error("Update address error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update address"
    });
  }
};

export const getAddressController = async(request,response)=>{
    try {
        const userId = request.userId // middleware auth

        const data = await AddressModel.find({ userId : userId }).sort({ createdAt : -1})

        return response.json({
            data : data,
            message : "List of address",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const deleteAddressController = async(request,response)=>{
    try {
        const userId = request.userId // auth middleware    
        const { _id } = request.body 

        const disableAddress = await AddressModel.updateOne({ _id : _id, userId},{
            status : false
        })

        return response.json({
            message : "Address remove",
            error : false,
            success : true,
            data : disableAddress
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


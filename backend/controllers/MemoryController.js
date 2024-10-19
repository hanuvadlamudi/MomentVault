import MemoryModel from '../Models/memoriesdb.js';

export const createMemory = async (req, res) => {
    try {
        const body = req.body;
        body.picture = req.file ? req.file?.path : null;
        const mem = new MemoryModel(body);
        await mem.save();
        res.status(201).json({
            message: "Memory created",
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};

export const getAllMemories = async (req, res) => {
    try {

        let {page,limit,search} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;  

        const skip = (page-1) * limit;

        let serachCriteria = {};

        if(search){
            serachCriteria = {
                $regex : search,
                $options : 'i'  //case insensitive
            }
        }

        const totalMemories = await MemoryModel.countDocuments(serachCriteria);
        const mems = await MemoryModel.find(serachCriteria)
        .skip(skip)
        .limit(limit)
        .sort({updatedAt : -1})

        const totalPages = Math.ceil(totalMemories / limit);

        res.status(200).json({
            message: "Memories retrieved",
            success: true,
            data: {
                memories: mems,
                pagination :{
                    totalMemories,
                    currentpage : page,
                    totalPages,
                    pageSize : limit
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};


export const getMemoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const mem = await MemoryModel.findOne({_id:id});
        res.status(200).json({
            message: "Get memory Details",
            success: true,
            data: mem
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};


export const deleteMemoryById = async(req,res) =>{
    try {
        const {id} = req.params;
        const mem = await MemoryModel.findByIdAndDelete({ _id: id});
        res.status(200).json({
            message : "Memory Deleted",
            success:true,
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success : false,
            error : err
        })
    }
}

export const updateMemoryById = async (req, res) => {
    try {
        const {memory,place,person,description} = req.body;
        const {id} = req.params;

        let updateData = {
            memory,place,person,description,updatedAt: new Date()
        }

        if(req.file){
            updateData.picture = req.file.path;
        }

        const updateMemory = await MemoryModel.findByIdAndUpdate(
            id,
            updateData,
            {new : true}
        )

        if(!updateMemory){
            return res.status(404).json({message : "Employee Not Found"})
        }

        res.status(200).json({
            message: "Memory updated",
            success: true,
            data:updateMemory
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};


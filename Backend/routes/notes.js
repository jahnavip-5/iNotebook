const express=require('express');
const router=express.Router()
var fetchuser=require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes"  .Requires authentcation

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    
    try {
        const notes=await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!")

    }
    
})


//ROUTE 2:Add a new note using: POST "/api/notes/addnote"  .Requires authentcation

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:1}),
    body('description','Description must contain atleast 1 characters').isLength({min:1})

] ,async (req,res)=>{

    try {
                        const {title,description,tag}=req.body;
                    // Return Bad request and errors in case of errors
                    // Extracts errors from a request
                    const errors=validationResult(req);
                    // If there are errors then return 400 error status
                    if(!errors.isEmpty()){
                        return res.status(400).json({error:errors.array()});
                    }

                    const note=new Note({
                        title,description,tag,user:req.user.id
                    })
                    const savedNote=await note.save()

                    res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!")

    }
    
})


//ROUTE :3:Update an existing note using: PUT "/api/notes/updatenote"  .Requires authentcation
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
//                       ^ Note ID  
    const {title,description,tag}=req.body;
    // Create new Note object

    try {
                    const newNote={};
                if(title){newNote.title=title};
                if(description){newNote.description=description};
                if(tag){newNote.tag=tag};

                // Find the note to be updated and update it
                let note= await Note.findById(req.params.id)
                //                           ^ Id of the note that u want to update
                // If the note doesn't exist
                if(!note){
                return res.status(404).send("No such note found!")
                }

                // Check if the note belongs to same user who requested for update
                if(note.user.toString()!==req.user.id){
                    return res.status(401).send("Access Denied")
                }

                // Update note
                note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
                //                                                                  ^ Note updated
                res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!")

    }
    
});


//ROUTE :4:Delete an existing note using: PUT "/api/notes/deletenote"  .Requires authentcation
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    //                       ^ Note ID  
       
        try {
                    // Find the note to be deleted and delete it
                let note= await Note.findById(req.params.id)
                //                           ^ Id of the note that u want to update
                // If the note doesn't exist
                if(!note){
                return res.status(404).send("No such note found!")
                }
            
                // Check if the note belongs to same user who requested for delete
                if(note.user.toString()!==req.user.id){
                    return res.status(401).send("Access Denied")
                }
            
                // Update note
                note=await Note.findByIdAndDelete(req.params.id)
                //                                                             
                res.json({"Success":"Note has been successfully deleted", note:note});
            
        } catch (error) {
            console.error(error.message);
        res.status(500).send("Internal server error!")

        }
        
    });

module.exports=router
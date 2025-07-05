import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Captain } from "./models/captain.model.js";
let io;
export const  intializeSocket = (server) => {
 io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],

    }
  })
  io.on("connection",(socket)=>{
    console.log(" new client connected " + socket.id);

socket.on("join",async(data)=>{
    const {userId,userType}=data
    console.log(data);
    if(userType==="user"){
        const user = await User.findByIdAndUpdate(userId,{
            socketId:socket.id
        },{
            new:true
        })
    
    }
    else if(userType==="captain"){
        const captain = await Captain.findByIdAndUpdate(userId,{
            socketId :socket.id
        },{
            new:true
        })
        
    }
})
socket.on("update_location",async(data)=>{
    console.log(data);
    const {userId,location}=data

   const captain =  await Captain.findByIdAndUpdate(userId,{location:{
        ltd:location.ltd,
        lng:location.lng
    }},{
        new:true
    })
   

})

    socket.on("disconnect",()=>{
        console.log(" client disconnected " + socket.id );
    })

  })
}

export const sendmessagetosocket = (socektid,message) => {
    if(io){
        io.to(socektid).emit(`${message.event}`,message.data);
    }
    else{
        console.log("io is not defined");
    }
  
}



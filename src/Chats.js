import { Avatar, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Chats.css';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';

const Chats = () => {
    const [ input, setInput ] = useState('');
    const [ seed, setSeed ] = useState('');
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ {user}, dispatch ] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapShot) => (
                setRoomName(snapShot.data().name)
                
            ))

            db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => 
                    doc.data()
                ))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = e => {
        e.preventDefault();
        
        if(input === '') {
            alert('please enter a message')
        } else {
            db.collection('rooms').doc(roomId).collection
            ('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setInput('');
        }
    }

    


    return (
        <div className='chats'>
            <div className='chat__header' >
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            
                <div className='chat__headerInfo'>
                    <h3> {roomName} </h3>
                    <p> Last seen at {''} </p>
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                </div>

                <div className='chat__headerRight' >
                    <IconButton>
                        <DonutLargeIcon  />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon /> 
                    </IconButton>
                        

                    <IconButton >
                        <DeleteIcon   />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'} `} >
                        <span className='chat__name'> {message.name} </span>
                            {message.message}
                        <span className='chat__timestamp'> {new Date(message.timestamp?.toDate()).toUTCString()} </span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <IconButton>
                    <InsertEmoticonIcon  />
                </IconButton>
                
                <form>
                    <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Type a message' />
                    <button onClick={sendMessage} > Send a message </button>
                </form>
            </div>
        </div>
    )
}

export default Chats

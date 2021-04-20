import { Avatar, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Chats.css';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const Chats = () => {
    const [ input, setInput ] = useState('');
    const [ seed, setSeed ] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = e => {
        e.preventDefault();

        console.log(input)
        setInput('');
    }

    return (
        <div className='chats'>
            <div className='chat__header' >
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            
                <div className='chat__headerInfo'>
                    <h3> Room name </h3>
                    <p> Last seen at ... </p>
                </div>

                <div className='chat__headerRight' >
                    <IconButton>
                        <DonutLargeIcon  />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon /> 
                    </IconButton>
                        

                    <IconButton>
                        <MoreVertIcon  />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                <p className={`chat__message true && ${'chat__reciever'} `} >
                    <span className='chat__name'> Raghav Luthra </span>
                        hey guys
                    <span className='chat__timestamp'> 3:33 pm </span>
                </p>

                <p className='chat__message'>
                    hey guys
                </p>
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

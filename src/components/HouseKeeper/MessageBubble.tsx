import React from 'react'
import Image from 'react-bootstrap/Image';
import './MessageBubble.css'

export const MessageBubble = (props: { speaker: string, message: string, status?: string }) => {
  return (
    <div className="message-bubble d-flex align-items-start">
      <Image src="../../../public/assets/sun-brand-logo.png" roundedCircle className="message-avatar" />
      <div className="ml-2">
        <div className="message-header">
          {props.speaker}
        </div>
        <div className="message-body">
          {props.message}
        </div>
      </div>
    </div>
  );
}

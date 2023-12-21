import React, { useMemo } from 'react'
import { motion } from 'framer-motion';
import Image from 'react-bootstrap/Image';
import './MessageBubble.css'

export const MessageBubble = (props: { speaker: string, message: string, status?: string }) => {
  const [messageArr, setMessageArr] = React.useState([]);
  const fadeInOut = useMemo(() => ({
    initial: { opacity: 0 },
    fastAnimation: { opacity: 1, transition: { duration: 0.5, delay: 0 } },
    slowAnimation: { opacity: 1, transition: { duration: 0.5, delay: 0 } },
    slowExit: { opacity: 0, transition: { duration: 1, delay: 0 } },
    fastExit: { opacity: 0, transition: { duration: 0, delay: 0 } }
  }), []);
  React.useEffect(() => {
    const wordsWithSpaces = props.message.split(' ').map(word => word + ' ');
    if (wordsWithSpaces.length > 0) {
      wordsWithSpaces[wordsWithSpaces.length - 1] = wordsWithSpaces[wordsWithSpaces.length - 1].trim();
    }
    // @ts-expect-error
    setMessageArr(wordsWithSpaces);
  }, [props.message]);

  return (
    <div className="message-bubble d-flex">
      <Image src="../../../public/assets/sun-brand-logo.png" roundedCircle className="message-avatar" />
      <div>
        <div className="message-header">
          {props.speaker}
        </div>
        <div className="message-body">
          {messageArr.map((msg, key) => (
            // eslint-disable-next-line react/jsx-key
            <span key={key} >
              <motion.div className="word" variants={fadeInOut} initial="initial" animate="slowAnimation" exit="slowExit">
              {msg}
              </motion.div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

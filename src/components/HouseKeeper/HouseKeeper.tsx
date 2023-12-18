import React from 'react';
import '../../stylesheets/HouseKeeper.css'
import { MessageBubble } from './MessageBubble.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion, AnimatePresence } from 'framer-motion';

const HouseKeeper = () => {
  // component variable
  const [isOpen, setIsOpen] = React.useState(false);
  const message = {
    speaker: 'QianChen',
    message: ''
  };
  const [historyMessage, setHistoryMessage] = React.useState([]);
  const chatVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  const buttonVariants = {
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
  };
  // handle api starts here
  const [userInput, setUserInput] = React.useState('');
  const [runId, setRunId] = React.useState('');
  const [threadId, setThreadId] = React.useState('');
  const [responseMessage, setResponseMessage] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      setUserInput(event.target.value);
    };

  // Helper function to handle HTTP GET requests
  const httpGet = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  // Helper function to handle HTTP POST requests
  const httpPost = async (url: string, data: object) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  // Function to check the status of the run
  const checkRunStatus = async (threadId: string, runId: string) => {
    try {
      const statusResponse = await httpGet(`https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/threads/${threadId}/runs/${runId}`);
      if (statusResponse.status === 'completed') {
        setStatus(statusResponse.status);
        fetchThreadMessages(threadId);
      } else {
        // setHistoryMessage((prev) => {return prev})
        setTimeout(async () => await checkRunStatus(threadId, runId), 2000);
      }
    } catch (error) {
      console.error('Error in checking run status:', error);
    }
  };

  // Function to fetch all messages from a thread
  const fetchThreadMessages = async (threadId: string) => {
    try {
      const messagesResponse = await httpGet(`https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/threads/${threadId}`);
      const message = messagesResponse.messages[0].content;
      addMessage('QianChen', message);
      // setResponseMessage(message);
    } catch (error) {
      console.error('Error in fetching thread messages:', error);
    }
  };

  // Function to send user input to the thread
  const sendUserInput = async () => {
    try {
      const response = await httpPost(`https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/threads/${threadId}`, { content: userInput });
      setRunId(response.run_id);
      checkRunStatus(threadId, response.run_id);
    } catch (error) {
      console.error('Error in sending user input:', error);
    }
  };

  React.useEffect(() => {
    const initializeThread = async () => {
      try {
        const response = await httpPost('https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/new', {});
        const newTID = response.thread_id;
        const newRID = response.run_id;
        localStorage.setItem('thread_id', newTID);
        localStorage.setItem('run_id', newRID);
        setThreadId(newTID);
        setRunId(newRID);
        checkRunStatus(newTID, newRID);
      } catch (error) {
        console.error('Error in initializing thread:', error);
      }
    };

    if (!localStorage.getItem('thread_id') && !localStorage.getItem('run_id')) {
      initializeThread();
    } else {
      // @ts-expect-error checked parameter
      setThreadId(localStorage.getItem('thread_id'));
      // @ts-expect-error checked parameter
      setRunId(localStorage.getItem('run_id'));
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userInput !== '') {
      addMessage('user', userInput);
      sendUserInput();
      setUserInput('');
    }
  };
  // Handle api ends here

  const HandleClose = () => {
    setIsOpen(false);
  }

  const HandleOpen = () => {
    setIsOpen(true);
  }

  const HandleScroll = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  }

  const addMessage = (speaker: string, message: string) => {
    const newMessage = {
      speaker: speaker,
      message: message
    };
    setHistoryMessage((prev) => {
      return [...prev, newMessage]
    })
    console.log(historyMessage);
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <Container className="p-0" fluid>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="housekeeper-open"
              variants={chatVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <Container className="chatbot p-0 d-flex flex-column">
                <button onClick={HandleClose}></button>
                <Row className="flex-grow-1" onWheel={HandleScroll} style={{ overflowY: 'auto' }}>
                  <Col>
                    <Container className="message-container">
                      {historyMessage.map((msg) => (
                        // eslint-disable-next-line react/jsx-key
                        <MessageBubble speaker={msg.speaker} message={msg.message} />
                      ))}
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <form onSubmit={handleSubmit} className="d-flex input-area">
                      <input
                        type="text"
                        name="request-input"
                        placeholder="Type your message here..."
                        className="flex-grow-1 input-field"
                        onChange={handleInputChange}
                        value={userInput}
                      />
                    </form>
                  </Col>
                </Row>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={buttonVariants}
          className="housekeeper-closed"
          initial="visible"
          animate={isOpen ? 'hidden' : 'visible'}
        >
          <button onClick={HandleOpen} className="open-button" >Open Chat</button>
        </motion.div>
      </Container>
    </>
  )
};

export default HouseKeeper;

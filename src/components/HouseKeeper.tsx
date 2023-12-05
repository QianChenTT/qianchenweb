import React from 'react';
import Container from 'react-bootstrap/Container';


const HouseKeeper = () => {
  const [userInput, setUserInput] = React.useState('');
  const [runId, setRunId] = React.useState('');
  const [threadId, setThreadId] = React.useState('');
  const [responseMessage, setResponseMessage] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
        return;
      } else {
        setTimeout(() => checkRunStatus(threadId, runId), 2000);
      }
    } catch (error) {
      console.error('Error in checking run status:', error);
    }
  };

  // Function to fetch all messages from a thread
  const fetchThreadMessages = async (threadId: string) => {
    try {
      const messagesResponse = await httpGet(`https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/threads/${threadId}`);
      const messages = messagesResponse.messages[0].content;
      setResponseMessage(messages);
    } catch (error) {
      console.error('Error in fetching thread messages:', error);
    }
  };

  // Function to send user input to the thread
  const sendUserInput = async () => {
    try {
      const response = await httpPost(`https://y75d43vkhohk37anophz77fo5m0wpzsu.lambda-url.ca-central-1.on.aws/api/threads/${threadId}`, { content: userInput });
      setUserInput('');
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

      //@ts-expect-error checked parameter
      setThreadId(localStorage.getItem('thread_id'));
      //@ts-expect-error checked parameter
      setRunId(localStorage.getItem('run_id'));
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userInput !== '') {
      sendUserInput();
    }
  };

  return (
    <>
      <Container className="p-0" fluid>
        {/*<p>{responseMessage}</p>*/}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="request-input"
            onChange={handleInputChange}
            value={userInput}
            style={{color: "black"}}
          />
        </form>
        <h3>{responseMessage}</h3>
      </Container>
    </>
  );
};

export default HouseKeeper;




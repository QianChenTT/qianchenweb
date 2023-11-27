import React from 'react'
import axios from 'axios';

const HouseKeeper = () => {
  // console.log('housekeeper created')
  const [userInput, setUserInput] = React.useState("");
  const [runId, setRunId]= React.useState("")
  const [threadId, setThreadId] = React.useState("")
  const [responseMessage, setResponseMessage] = React.useState("")
  const [status, setStatus] = React.useState("")

  const handleInputChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
  }

  //API Functions start here

  // Function to check the status of the run
  const checkRunStatus = async (threadId: string, runId: string) => {
    // console.log('checking status')
    try {
      const statusResponse = await axios.get(`https://zck5pcxz76v6pdvzgnst3fntxa0yjqzv.lambda-url.ca-central-1.on.aws//api/threads/${threadId}/runs/${runId}`);
      if (statusResponse.data.status === 'completed') {
        console.log('status is ' + statusResponse.data.status)
        setStatus(statusResponse.data.status);
        fetchThreadMessages(threadId);
        return;
      } else {
        // Optionally, recheck after a delay if the run is not completed
        setTimeout(() => checkRunStatus(threadId, runId), 1000);
      }
    } catch (error) {
      console.error('Error in checking run status:', error);
    }
  };

  // Function to fetch all messages from a thread
  const fetchThreadMessages = async (threadId: string) => {
    try {
      const messagesResponse = await axios.get(`https://zck5pcxz76v6pdvzgnst3fntxa0yjqzv.lambda-url.ca-central-1.on.aws//api/threads/${threadId}`);
      const messages = messagesResponse.data.messages[0].content;
      setResponseMessage(messages)
      // setResponseMessage(messages.map(msg => msg.content).join('\n'));
    } catch (error) {
      console.error('Error in fetching thread messages:', error);
    }
  };

  // Function to send user input to the thread
  const sendUserInput = async () => {
    try {
      const response = await axios.post(`https://zck5pcxz76v6pdvzgnst3fntxa0yjqzv.lambda-url.ca-central-1.on.aws//api/threads/${threadId}`, {
        content: userInput
      });
      setUserInput(''); // Clear the input field
      setRunId(response.data.run_id); // Update the runId with the new run_id
      checkRunStatus(threadId, response.data.run_id);
    } catch (error) {
      console.error('Error in sending user input:', error);
    }
  };


  React.useEffect(() => {
    const initializeThread = async () => {
      try {
        const response = await axios.post('https://zck5pcxz76v6pdvzgnst3fntxa0yjqzv.lambda-url.ca-central-1.on.aws//api/new');
        const newTID = response.data.thread_id;
        const newRID = response.data.run_id
        setThreadId(newTID);
        setRunId(newRID);
        // console.log("thread_id: " + threadId + " run_id: " + runId);
        checkRunStatus(newTID, newRID);
      } catch (error) {
        console.error('Error in initializing thread:', error);
      }
    };

    initializeThread()
  }, []);


  const handleSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    sendUserInput();
  }

  //API Functions end here

  return (
      <>
        <div>
          <div>{responseMessage}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="request-input"
              onChange={handleInputChange}
              value={userInput}
            />
          </form>
        </div>
      </>
  )
}

export default HouseKeeper;
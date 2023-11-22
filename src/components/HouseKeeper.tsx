import React from 'react'
// import OpenAI from "openai";


const HouseKeeper = () => {
  const api_key = "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";
  // const openai = new OpenAI({ apiKey: api_key })
  const [housekeeperInput, setHousekeeperInput] = React.useState("");


  // async function requestAI() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });
  //
  //   console.log(completion.choices[0]);
  // }

  const handleInputChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    setHousekeeperInput(event.target.value);
  }

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(housekeeperInput)
  }

  return (
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="request-input"
              onChange={handleInputChange}
              value={housekeeperInput}
            />
          </form>
        </div>
      </>
  )
}

export default HouseKeeper;
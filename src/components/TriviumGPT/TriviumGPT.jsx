import { useState } from "react";
import "./TriviumGPT.css";
import VictorHomePage from "../../assets/VictorHomePage.png";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  InputToolbox,
  AttachmentButton,
  SendButton,
} from "@chatscope/chat-ui-kit-react";
import VoiceRec from "../VoiceRec/VoiceRec";

const API_KEY = import.meta.env.VITE_REACT_API_GPT_KEY;

function TriviumGPT() {
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [notCompatible, setNotCompatible] = useState();
  const [iconstate, setIcon] = useState("square");
  const [messagePaused, setMessagePaused] = useState();

  const [messages, setMessages] = useState([
    {
      message:
        "Eai, tudo bem!? Eu sou o Prof. Victor, professor virtual do Colégio Trivium! Como posso ajudar você hoje?",
      sender: "ChatGPT",
    },
  ]); //Array de mensagens
  async function talk(message) {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    console.log("teste");
    console.log("talk");
    let msg = new SpeechSynthesisUtterance();
    msg.voice = voices[0];
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = await message;
    msg.lang = "pt-BR";
    synth.speak(msg);
  }

  const handleSend = async (message) => {
    setListening(false);
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //Todas as mensagens + a nova mensagem (spreading).

    //Atualiza o estado da mensagem
    setMessages(newMessages);
    //Victor esta digitando...
    setTyping(true);

    //Processar a mensagem para o ChatGPT (mandar e ver a resposta)
    SpeechRecognition.stopListening();
    resetTranscript();
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // <-- Recebe um array como parametro

    //chatMessages {sender: "user" or "ChatGPT", message: "conteudo da mensagem aqui" } <-- Objeto das mensagens no chat
    //apiMessage { role: "user" or "assistant", content: "conteudo da mensagem aqui" } <-- Objeto da mensagem na Api

    let apiMessages = chatMessages.map((messageObject) => {
      // <-- Traduz o objeto do chat para os moldes da API
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }; // <-- Retorna este objeto para a variavel apiMessages
    });

    //role: "user" -> Mensagens do usuario, assistant - > Resposta do chat

    //"system" -> uma mensagem inicial para como o chatgpt deve falar
    const systemMessage = {
      role: "system",
      content:
        "você se chama Victor, Aja como um professor STEM virtual ajudando um aluno com arduino, criação de jogos, robótica e eletrônica simples, você faz parte de um colégio chamado Colégio Trivium, caso a pergunta do aluno seja fora do escopo de educação e robótica, como por exemplo se o assunto for da àrea de psicologia ou esportes, peça desculpas e diga que pode ajuda-lo apenas no quesito de educação STEM, a pergunta feita foi a seguinte: ",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);

        setMessages([
          ...chatMessages,
          { message: data.choices[0].message.content, sender: "ChatGPT" },
        ]);
        console.log(messages);
        console.log();
        setTyping(false);
        return data.choices[0].message.content;
      })
      .then(async (message) => {
        console.log("hmmm");
        await talk(message);
      });
  }
  // Sessão de reconhecimento de fala:
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  return (
    <div id="MainContainer">
      <div
        id="MainSirioContainer"
        // style={{ position: "relative", height: "900px", width: "1000px" }}
      >
        <MainContainer>
          <ChatContainer id="SirioContainer">
            <MessageList
              id="MessagesContainer"
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Prof. Victor está digitando" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                if (messages[i].sender === "ChatGPT") {
                  return (
                    <div id="SirioMessage">
                      <img src={VictorHomePage} alt="" />
                      <Message
                        className="MessagesContainers"
                        key={i}
                        model={message}
                      />
                    </div>
                  );
                } else {
                  return (
                    <Message
                      className="MessagesContainers"
                      key={i}
                      model={message}
                    />
                  );
                }
              })}
            </MessageList>
            {/* {listening ? ( */}
            <MessageInput
              // sendButton={false}
              sendDisabled={listening ? false : undefined}
              value={listening ? transcript : undefined}
              placeholder="Escreva sua mensagem aqui..."
              onSend={(message) => {
                listening ? handleSend(transcript) : handleSend(message);

                // SpeechRecognition.stopListening();
              }}
            ></MessageInput>
            {/* ) : (
              <MessageInput
                //
                placeholder="Escreva sua mensagem aqui..."
                onSend={handleSend}
              ></MessageInput>
            )} */}
            <InputToolbox>
              {/* <SendButton /> */}
              {/* teste */}
              <div>
                <button
                  className="toolBox-buttons"
                  onClick={() => {
                    if (!listening) {
                      resetTranscript();
                      SpeechRecognition.startListening({
                        continuous: true,
                        language: "pt-BR",
                      });
                      if (!browserSupportsSpeechRecognition) {
                        alert(
                          "Seu navegador não é compativel com o Reconhecimento de fala!"
                        );
                      }
                      setListening(true);
                      // setIcon("square");
                    } else {
                      SpeechRecognition.stopListening();
                      setListening(false);
                    }
                  }}
                >
                  <box-icon
                    color="rgb(242, 16, 61)"
                    type="solid"
                    name="microphone"
                    style={
                      listening ? { backgroundColor: "rgb(242, 16, 61)" } : {}
                    }
                  ></box-icon>
                </button>
              </div>{" "}
            </InputToolbox>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default TriviumGPT;

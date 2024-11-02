import { GigaChat } from "gigachat-node";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { LandmarkRepository } from "../repositories/Landmark";

const client = new GigaChat(process.env.GIGA_CHAT_TOKEN!, true, true, true);
const landmarkRepository = new LandmarkRepository();

export class GigaChatService {
  async regionSpeech(
    adminCenterId: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    if (!JSON.parse(process.env.IS_GIGA_CHAT!)) {
      console.log("Giga Chat выключен");
      socket.send("==ERROR==");
      return;
    }

    try {
      const adminCenter = await landmarkRepository.getAdminCenterData(
        adminCenterId
      );

      if (adminCenterId === null) {
        socket.send("Административный центр не найден");
        return;
      }

      await client.createToken();
      const stream = await client.completionStream({
        max_tokens: 700,
        model: "GigaChat:latest",
        messages: [
          {
            role: "system",
            content:
              "Ты помощник, который должен отвечать без приветствий и любых других любезностей. Твоя задача отдавать интересную и сжатую информацию по туристическим вопросам. ОТВЕЧАЙ ВСЕГДА МАКСИМУМ ЗА ДВА ПРЕДЛОЖЕНИЯ!",
          },
          {
            role: "user",
            content: `Расскажи про ${
              adminCenter?.name
            } кратко и интересно. Краткая информация про район: площадь: ${adminCenter?.area.toFixed(
              2
            )}, цент: ${
              adminCenter?.capital
            }. Добавь что-то интересное про это.`,
          },
        ],
      });

      let buffer = "";

      stream.on("data", (chunk) => {
        buffer += chunk.toString("utf-8");

        let boundary;
        while ((boundary = buffer.indexOf("\n")) !== -1) {
          const jsonLine = buffer.substring(0, boundary).trim();
          buffer = buffer.substring(boundary + 1);

          if (jsonLine.startsWith("data:") && jsonLine !== "data: [DONE]") {
            const jsonDataString = jsonLine.substring(5).trim();
            if (jsonDataString) {
              try {
                const jsonData = JSON.parse(jsonDataString);
                if (
                  jsonData.choices &&
                  jsonData.choices[0] &&
                  jsonData.choices[0].delta
                ) {
                  socket.send(jsonData.choices[0].delta.content);
                }
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      });

      stream.on("end", () => {
        socket.send("==DONE==");
        return;
      });
    } catch (error) {
      console.error("Ошибка при обработке запроса:", error);
      socket.send("==ERROR==");
      socket.disconnect();
      return;
    }
  }
}

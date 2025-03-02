import { Kafka } from "kafkajs";

function produce({offer, amount}, deleteFlag) {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
  });

  const producer = kafka.producer();

  async function sendMessage() {
    await producer.connect();
    await producer.send({
      topic: "test-topic",
      messages: [
        {
          key: "offer",
          value: JSON.stringify({
            offer,
            amount,
            deleteFlag,
          }),
        },
      ],
    });
    console.log("OFFER SENT!!!!!!!!"); // STDOUT for offer sent (producer)
    await producer.disconnect();
  }

  sendMessage();
}

export default produce;

import { createOffer, deleteOffer } from "../utilities/offerUtilites.js";
import { Kafka } from "kafkajs";

function consume() {
  async function consumeOffers() {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["kafka:9092"],
    });
    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect();
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const obj = JSON.parse(message.value.toString());
        console.log("======================================================");
        console.log(obj); // STDOUT for object receiving (consumer)
        console.log("======================================================");

        if (obj.deleteFlag) {
          console.log("DELETE AN OFFER");
          deleteOffer(obj.offer, obj.amount);
        } else {
          console.log("CREATE AN OFFER");
          createOffer(obj.offer, obj.amount);
        }
      },
    });
  }
  consumeOffers();
}

export default consume;

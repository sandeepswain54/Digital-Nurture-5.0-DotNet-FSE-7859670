using Confluent.Kafka;

namespace KafkaChatApp
{
    public class KafkaProducer
    {
        private const string Topic = "chat-topic";
        private const string BootstrapServers = "localhost:9092";

        public static async Task StartProducer()
        {
            var config = new ProducerConfig
            {
                BootstrapServers = BootstrapServers
            };

            using var producer = new ProducerBuilder<Null, string>(config).Build();

            Console.WriteLine("=== Kafka Chat Producer Started ===");
            Console.WriteLine("Type messages to send (type 'exit' to quit):");

            while (true)
            {
                Console.Write("You: ");
                var message = Console.ReadLine();

                if (message?.ToLower() == "exit") break;

                await producer.ProduceAsync(Topic, new Message<Null, string>
                {
                    Value = message ?? string.Empty
                });

                Console.WriteLine("Message sent successfully!");
            }
        }
    }
}
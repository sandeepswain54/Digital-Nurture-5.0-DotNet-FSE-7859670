using Confluent.Kafka;

namespace KafkaChatApp
{
    public class KafkaConsumer
    {
        private const string Topic = "chat-topic";
        private const string BootstrapServers = "localhost:9092";

        public static void StartConsumer()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = BootstrapServers,
                GroupId = "chat-consumer-group",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
            consumer.Subscribe(Topic);

            Console.WriteLine("=== Kafka Chat Consumer Started ===");
            Console.WriteLine("Waiting for messages...");

            while (true)
            {
                var result = consumer.Consume();
                Console.WriteLine($"Received Message: {result.Message.Value}");
                Console.WriteLine($"Topic: {result.Topic}");
                Console.WriteLine($"Partition: {result.Partition}");
                Console.WriteLine($"Offset: {result.Offset}");
                Console.WriteLine("---");
            }
        }
    }
}